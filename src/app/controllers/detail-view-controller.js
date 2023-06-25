import {} from "../views/job-detail-view.js";
import { createHeader, createBackButton } from "./view-controller.js";
import { statusColor } from "./jobs-view-controller.js";

const jobDetailContainer = document.querySelector("#jobDetailContainer");
const jobDetailElements = {
  content: {},
  header: {},
  viewElement: {},
};
const loadingData = {
  customerFirstName: "Customer ",
  customerLastName: "...",
  customerMobile: "...",
  tagNumber: "...",
  serviceStatus: "...",
  bikeMake: "...",
  bikeName: "...",
  bookingComments: "...",
  serviceItems: "<div>...</div>",
};

export function createJobDetailView() {
  jobDetailContainer.innerHTML = "";

  const jobDetailViewElement = document.createElement("job-detail-view");
  jobDetailViewElement.id = "jobDetailView";
  jobDetailViewElement.classList.add("job-detail-view");
  jobDetailViewElement.jobDetail = loadingData;

  const jobDetailContent = document.createElement("div");
  jobDetailContent.classList.add("job-detail--content");

  jobDetailElements["viewElement"] = jobDetailViewElement;
  jobDetailElements["content"] = jobDetailContent;
  jobDetailElements["header"] = createHeader({
    headerText: "Loading...",
    backBtn: { bid: "jobs", text: "Jobs" },
  });

  jobDetailContainer.append(jobDetailContent);
  jobDetailContent.append(jobDetailElements["header"]);
  jobDetailContent.append(jobDetailViewElement);
}

export function updateJobDetailView(viewData) {
  console.log("Update jo detail: ", viewData);
  jobDetailElements["viewElement"].jobDetail = viewData["jobDetail"];
  const jobStatusColors = statusColor(viewData["jobDetail"].serviceStatus);
  jobDetailElements["viewElement"].style.setProperty("--job-status-color", jobStatusColors.color);
  jobDetailElements["viewElement"].style.setProperty("--job-status-bgcolor", jobStatusColors.bgcolor);
  jobDetailElements["header"].headerData = {
    headerText: viewData["headerText"],
    buttonList: [createBackButton({ bid: "jobs", text: "Jobs" })],
  };
}
