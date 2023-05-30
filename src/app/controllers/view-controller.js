import {} from "../components/login-form.js";
import {} from "../components/mechanic-button.js";
import {} from "../components/job-card.js";
import {} from "../views/job-detail-view.js";
import {} from "../components/service-item.js";
import {} from "../components/section-header.js";
import {} from "../components/back-button.js";
import {} from "../components/refresh-button.js";
import {
  getMechanics,
  getJobs,
  getJobDetailData,
  shopName,
  mechanicName,
  refreshData,
} from "./data-controller.js";
import { onLoginClicked } from "./event-controller.js";
import {
  createMechanicListView,
  updateMechanicListView,
} from "./mechanics-view-controller.js";
import {
  createJobDetailView,
  updateJobDetailView,
} from "./detail-view-controller.js";

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
  createMechanicListView();

  getMechanics(requestData)
    .then((mechanicsList) => {
      const headerText = shopName() + " Mechanics";
      const mechanicViewData = {
        headerText: headerText,
        mechanicList: mechanicsList.length > 0 ? mechanicsList : [],
      };
      updateMechanicListView(mechanicViewData);
    })
    .catch((error) => {
      console.error("Error generating mech list: ", error);
      const mechanicViewData = {
        headerText: "Error",
        mechanicList: [
          {
            guid: 0,
            displayColor: "#bc0000",
            firstName: "Data Error",
          },
        ],
      };
      updateMechanicListView(mechanicViewData);
    });
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
      backBtn: { bid: "mechs", text: "Mechs" },
      refreshBtn: { rid: "jobs", mid: selectedMechanic },
    })
  );
  jobListContent.append(jobViewElement);
}

export function generateJobDetail(selectedJob) {
  createJobDetailView();

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
      const updateData = {
        headerText: "Service Information",
        jobDetail: jobData,
      };
      updateJobDetailView(updateData);
    })
    .catch((error) => {
      console.error("VC - Error generating job detail", error);
      const updateData = {
        headerText: "No Service Data",
        jobDetail: {
          bookingComments: "Error retreiving service information.",
        },
      };
      updateJobDetailView(updateData);
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
  const buttons = [];

  if (params.backBtn) {
    buttons.push(createBackButton(params.backBtn));
  }
  if (params.refreshBtn) {
    buttons.push(createRefreshButton(params.refreshBtn));
  }

  el.headerData = {
    headerText: params.headerText,
    buttonList: buttons,
  };
  return el;
}

export function createBackButton(params) {
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
