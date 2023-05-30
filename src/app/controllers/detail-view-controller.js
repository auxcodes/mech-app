import { createHeader } from "./view-controller.js";
import {} from "../views/job-detail-view.js";

const jobDetailContainer = document.querySelector("#jobDetailContainer");
const jobDetailElements = {
  content: {},
  header: {},
  viewElement: {},
};
const loadingData = {
  customerLastName: "...",
  customerMobile: "...",
  tagNumber: "...",
  serviceStatus: "...",
  bikeMake: "...",
  bikeName: "...",
  bookingComments: "...",
  serviceItems: "...",
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
    buttonParams: { bid: "jobs", text: "Jobs" },
  });

  jobDetailContainer.append(jobDetailContent);
  jobDetailContent.append(jobDetailElements["header"]);
  jobDetailContent.append(jobDetailViewElement);
}

export function updateJobDetailView(viewData) {
  jobDetailElements["header"] = viewData["headerText"];
  jobDetailElements["viewElement"] = viewData["jobDetail"];
}
