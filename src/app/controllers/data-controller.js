import { onSessionExpired } from "./event-controller.js";
import { shopData, jobDetail } from "../online-data.js";

const shopInfo = { shopName: "" };
const mechanics = { data: [] };
const allJobs = { data: [] };
const mechanicJobs = { data: [] };
const displayedJob = { data: {} };
const mechName = "";
const request = { data: {} };

export async function getMechanics(requestData) {
  request["data"] = requestData;
  if (mechanics.data.length === 0) {
    await shopData(requestData)
      .then((response) => {
        if (validSession(response)) {
          onSessionExpired();
          return;
        }
        if (response["data"] !== undefined) {
          //console.log("DC - getMechanics - shopData", response["msg"]);
          const shopData = response["data"];
          //console.log("DC - Shop data: ", shopData);
          shopInfo["shopName"] = shopData["shopName"];
          filterStaff(Object.values(shopData["mechanics"]));
          allJobs["data"] = Object.values(shopData["jobsList"]);
        } else {
          mechanics.data = [
            {
              displayName: "Error Occured",
              displayColor: "#bc0000",
              firstName: "Error",
              guid: "0",
            },
          ];
        }
      })
      .catch((error) => {
        console.error("DC - Get shopData request failed", error);
        mechanics.data = [
          {
            displayName: "Error Occured",
            displayColor: "#bc0000",
            firstName: "Error Occured",
            guid: "0",
          },
        ];
      });
  }
  return mechanics.data;
}

export async function refreshData() {
  await shopData(request["data"])
    .then((response) => {
      if (validSession(response)) {
        onSessionExpired();
        return;
      }
      const shopData = response["data"];
      shopInfo["shopName"] = shopData["shopName"];
      filterStaff(Object.values(shopData["mechanics"]));
      allJobs["data"] = Object.values(shopData["jobsList"]);
    })
    .catch((error) => console.error("DC - Refresh request failed", error));
}

export function getJobs(mechGuid) {
  if (
    mechanicJobs.data.length === 0 ||
    mechanicJobs.data["0"].technicianGuid !== mechGuid
  ) {
    filterMechJobs(mechGuid, allJobs["data"]);
  }
  return mechanicJobs.data;
}

export function getJobCardData(jobGuid) {
  return filterAllJobs(jobGuid);
}

export async function getJobDetailData(jobGuid) {
  displayedJob["data"] = {};
  await jobDetail(jobGuid)
    .then((response) => {
      if (validSession(response)) {
        onSessionExpired();
        return;
      }
      displayedJob["data"] = response["data"];
      //console.log("DC - displayedJob: ", displayedJob["data"]);
      if (response["data"]["serviceItems"]) {
        displayedJob["data"]["siTotal"] = serviceItemsTotal(
          response["data"]["serviceItems"]
        );
      }
    })
    .catch((error) =>
      console.error("DC - Get job detail request failed", error)
    );
  return displayedJob["data"];
}

export function shopName() {
  return shopInfo["shopName"];
}

export function mechanicName(mechId) {
  return mechanics["data"].find((mech) => mech.guid === mechId)["firstName"];
}

function validSession(sessionData) {
  let sessionExpired = false;
  //console.log("Valid Session check: ", sessionData);
  if (sessionData["data"]["resultsData"]) {
    const message = sessionData["data"]["resultsData"]["message"];
    sessionExpired = message.includes("Session Token invalid");
    console.log("SessionExpired: ", sessionExpired);
  }
  return sessionExpired;
}

function filterStaff(staffList) {
  //console.log("DC - Filter staff: ", staffList);
  const mechs = staffList
    .filter((staff) => isMechanic(staff))
    .sort((a, b) => a.orderIndex - b.orderIndex);
  const mechList = mechs.map((mech) => {
    const mechDetails = {
      displayName: mech.displayName,
      displayColor: mech.displayColor,
      firstName: mech.firstName,
      guid: mech.guid,
    };
    if (mech.jobTitle === "1") {
      mechDetails["displayName"] = "Unassigned";
      mechDetails["firstName"] = "Unassigned";
    }
    return mechDetails;
  });
  mechanics["data"] = mechList;
}

function isMechanic(staffMember) {
  return (
    (staffMember.jobTitle === "1" ||
      staffMember.jobTitle === "Mechanic" ||
      staffMember.jobTitle === "WTL" ||
      staffMember.firstName === "Jenna") &&
    staffMember.showAsMechanic === "1"
  );
}

function filterMechJobs(mechGuid, jobList) {
  const jobs = jobList.filter((job) => job.technicianGuid === mechGuid);
  mechanicJobs["data"] = jobs;
}

function filterAllJobs(jobGuid) {
  const jobDetail = jobList.find((job) => job.serviceGuid === jobGuid);
  return jobDetail;
}

function serviceItemsTotal(serviceItems) {
  let totalHours = 0;
  let totalCost = 0;
  serviceItems.forEach((item) => {
    const hours = item["serviceHrsRequired"];
    const cost = item["price"] * item["quantity"];
    totalHours = +hours + +totalHours;
    totalCost = +cost + +totalCost;
  });
  return { hours: totalHours, cost: totalCost };
}
