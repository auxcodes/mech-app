import {} from "./components/login-form.js";
import {} from "./components/mechanic-button.js";
import {} from "./components/job-card.js";
import {} from "./views/job-detail-view.js";
import {} from "./components/service-item.js";
import {} from "./components/section-header.js";
import {} from "./components/back-button.js";
import {} from "./components/refresh-button.js";
import {
  getMechanics,
  getJobs,
  getJobDetailData,
  shopName,
  mechanicName,
  refreshData,
} from "./data-controller.js";
import { onLoginClicked } from "./event-controller.js";

const root = document.querySelector(":root");
const loginContainer = document.querySelector("#loginContainer");
const mechListContainer = document.querySelector("#mechanicsListContainer");
const jobListContainer = document.querySelector("#jobsListContainer");
const jobDetailContainer = document.querySelector("#jobDetailContainer");
const viewPasswordElements = { input: null, button: null };

export async function loginView(formData) {
  loginContainer.innerHTML = "";
  try {
    const loginFormElement = document.createElement("login-form");
    loginFormElement.id = "loginForm";
    loginFormElement.classList.add("login-form");
    loginFormElement.form = formData;
    if (formData.error.length > 0) {
      toggleLoginError(1);
    }
    loginFormElement.onsubmit = (event) => {
      event.preventDefault();
      onLoginClicked(event.target["uname"].value, event.target["pword"].value);
    };
    const headerText = "Sign-In Required";
    const loginFormContent = document.createElement("div");
    loginFormContent.classList.add("login-form--content");
    loginFormContent.append(createHeader({ headerText: headerText }));
    loginFormContent.append(loginFormElement);
    loginContainer.append(loginFormContent);
  } catch (error) {
    console.error("VC - Error creating login form: ", error);
  }
}

export function generateMechanicList(requestData) {
  mechListContainer.innerHTML = "";
  const mechViewElement = document.createElement("ul");
  mechViewElement.id = "mechanicListView";
  mechViewElement.classList.add("mechanics-view");
  mechViewElement.resultLoading = {};
  const mechViewContent = document.createElement("div");
  mechViewContent.classList.add("mechanic-list--content");
  mechViewContent.append(createHeader({ headerText: "Loading..." }));
  mechViewContent.append(mechViewElement);

  getMechanics(requestData)
    .then((mechanicsList) => {
      if (mechanicsList.length > 0) {
        mechanicsList.forEach((mech) => {
          const li = document.createElement("li");
          const button = document.createElement("mechanic-button");
          button.mechButton = mech;
          li.append(button);
          mechViewElement.append(li);
        });
      }

      // mechViewElement.resultLoading = {};
      const headerText = shopName() + " Mechanics";
      const mechViewContent = document.createElement("div");
      mechViewContent.classList.add("mechanic-list--content");
      mechListContainer.append(mechViewContent);
      mechViewContent.append(createHeader({ headerText: headerText }));
      mechViewContent.append(mechViewElement);
    })
    .catch((error) => console.error("Error generating mech list: ", error));
}

export function generateJobsList(selectedMechanic) {
  jobListContainer.innerHTML = "";
  const jobsList = getJobs(selectedMechanic);

  const jobViewElement = document.createElement("ul");
  jobViewElement.id = "jobListView";
  jobViewElement.classList.add("jobs-view");

  if (jobsList.length > 0) {
    jobsList.forEach((job) => {
      const li = document.createElement("li");
      const jobCard = document.createElement("job-card");
      jobCard.jobCardDetails = job;
      li.append(jobCard);
      jobViewElement.append(li);
    });
  }

  jobViewElement.resultLoading = {};
  const jobListContent = document.createElement("div");
  jobListContent.classList.add("job-list--content");
  jobListContainer.append(jobListContent);
  const headerText = mechanicName(selectedMechanic) + "'s Services";
  jobListContent.append(
    createHeader({
      headerText: headerText,
      buttonParams: { bid: "mechs", text: "Mechs" },
      refresh: { rid: "jobs", mid: selectedMechanic },
    })
  );
  jobListContent.append(jobViewElement);
}

export function generateJobDetail(selectedJob) {
  jobDetailContainer.innerHTML = "";
  const jobDetailViewElement = document.createElement("job-detail-view");
  jobDetailViewElement.id = "jobDetailView";
  jobDetailViewElement.classList.add("job-detail-view");
  const jobDetailContent = document.createElement("div");
  jobDetailContent.classList.add("job-detail--content");

  getJobDetailData(selectedJob)
    .then((data) => {
      const jobData = data;
      const siData = jobData["serviceItems"];
      const totals = {
        guid: "total",
        label: "",
        serviceHrsRequired: jobData["siTotal"]["hours"] + " hrs",
        price: jobData["siTotal"]["cost"],
      };
      siData.push(totals);

      jobData["serviceItems"] = serviceItems(siData, totals);
      jobDetailViewElement.jobDetail = jobData;
      jobDetailContainer.append(jobDetailContent);
      jobDetailContent.append(
        createHeader({
          headerText: "Service Information",
          buttonParams: { bid: "jobs", text: "Jobs" },
        })
      );
      jobDetailContent.append(jobDetailViewElement);
    })
    .catch((error) => {
      console.error("VC - Error generating job detail", error);
      const jobDetailContent = document.createElement("div");
      jobDetailContent.classList.add("job-detail--content");
      jobDetailContent.append(
        createHeader({
          headerText: "No Service Data",
          buttonParams: { bid: "jobs", text: "Jobs" },
        })
      );
      jobDetailContent.append("Error retreiving service information.");
      jobDetailContainer.append(jobDetailContent);
    });
}

export function refreshJobList() {
  refreshData();
}

function serviceItems(items, totals) {
  const outerEl = document.createElement("div");
  const itemList = document.createElement("ul");
  outerEl.append(itemList);
  items.forEach((item) => {
    const li = document.createElement("li");
    const serviceItem = document.createElement("service-item");
    serviceItem.serviceItemData = item;
    li.append(serviceItem);
    itemList.append(li);
  });
  return itemList;
}

export function createHeader(params) {
  const el = document.createElement("section-header");
  el.headerText = params.headerText;
  if (params.buttonParams) {
    el.append(createBackButton(params.buttonParams));
  }
  if (params.refresh) {
    el.append(createRefreshButton(params.refresh));
  }
  return el;
}

function createBackButton(params) {
  const el = document.createElement("back-button");
  el.buttonConfig = params;
  return el;
}

function createRefreshButton(params) {
  const el = document.createElement("refresh-button");
  el.buttonConfig = params;
  return el;
}

export function toggleLogin() {
  loginContainer.classList.toggle("display");
}

export function toggleMechanicButtons() {
  mechListContainer.classList.toggle("display");
}

export function toggleJobList() {
  jobListContainer.classList.toggle("display");
}

export function toggleJobDetail() {
  jobDetailContainer.classList.toggle("display");
}

export function toggleViewPassword() {
  if (viewPasswordElements.button === null) {
    viewPasswordElements.button = document.querySelector("#view-password");
    viewPasswordElements.input = document.querySelector(
      "#login-password-input"
    );
  }
  viewPasswordElements.button.classList.toggle("view-pwd");
  viewPasswordElements.input.type = typeCompare(
    viewPasswordElements.input.type
  );
}

export function resetSite() {
  mechListContainer.classList.remove("display");
  jobListContainer.classList.remove("display");
  jobDetailContainer.classList.remove("display");
  loginContainer.classList.toggle("display");
}

export function toggleLoginError(opacity) {
  root.style.setProperty("--error-opacity", opacity);
}

function typeCompare(currentType) {
  return currentType === "password" ? "text" : "password";
}
