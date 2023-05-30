import { createHeader, createBackButton } from "./view-controller.js";
import {} from "../views/job-detail-view.js";

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
  jobDetailElements["viewElement"].jobDetail = viewData["jobDetail"];
  jobDetailElements["header"].headerData = {
    headerText: viewData["headerText"],
    buttonList: [createBackButton({ bid: "jobs", text: "Jobs" })],
  };
}
