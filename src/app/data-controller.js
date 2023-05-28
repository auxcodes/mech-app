import { onSessionExpired } from "./event-controller.js";
import { shopData, jobDetail } from "./online-data.js";

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
      .then((result) => {
        if (result["shopParams"] !== undefined) {
          //console.log("DC - getMechanics - shopData", result["msg"]);
          const shopData = result["shopParams"];
          //console.log("DC - Shop data: ", shopData);
          shopInfo["shopName"] = shopData["shopName"];
          filterStaff(Object.values(shopData["mechanics"]));
          allJobs["data"] = Object.values(shopData["jobsList"]);
        } else {
          mechanics.data = [
            {
              displayName: "Error Occured",
              displayColor: "#ffffff",
              firstName: "Error",
              guid: "0",
            },
          ];
        }
      })
      .catch((error) =>
        console.error("DC - Get shopData request failed", error)
      );
  }
  return mechanics.data;
}

export async function refreshData() {
  await shopData(request["data"])
    .then((result) => {
      const shopData = result["shopParams"];
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
      if (response["serviceData"]["resultsData"]) {
        const message = response["serviceData"]["resultsData"]["message"];
        const logBackIn = message.includes("Session Token invalid");
        console.log("Message: ", logBackIn);
        onSessionExpired();
        return;
      }
      displayedJob["data"] = response["serviceData"];
      //console.log("DC - displayedJob: ", displayedJob["data"]);
      if (response["serviceData"]["serviceItems"]) {
        displayedJob["data"]["siTotal"] = serviceItemsTotal(
          response["serviceData"]["serviceItems"]
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

function filterStaff(staffList) {
  //console.log("DC - Filter staff: ", staffList);
  const mechs = staffList
    .filter((staff) => isMechanic(staff))
    .sort((a, b) => a.orderIndex - b.orderIndex);
  const mechList = mechs.map((mech) => {
    return {
      displayName: mech.displayName,
      displayColor: mech.displayColor,
      firstName: mech.firstName,
      guid: mech.guid,
    };
  });
  mechanics["data"] = mechList;
}

function isMechanic(staffMember) {
  return (
    (staffMember.jobTitle === "Mechanic" ||
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
