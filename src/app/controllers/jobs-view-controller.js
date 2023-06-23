import { createHeader } from "./view-controller.js";
import {} from "../views/job-list-view.js";

const jobListContainer = document.querySelector("#jobsListContainer");
const jobListElements = {
  content: {},
  header: {},
  viewElement: {},
};
const jobStatusColor = {
  booked: { color: "", bgcolor: "" },
  inProgress: { color: "", bgcolor: "" },
  complete: { color: "", bgcolor: "" },
  collected: { color: "", bgcolor: "" },
  orderParts: { color: "", bgcolor: "" },
  toOrderParts: { color: "", bgcolor: "" },
  cancelled: { color: "", bgcolor: "" },
};

export function createJobListView() {}

export function updateJobListView(viewData) {}
