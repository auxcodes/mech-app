import { createHeader } from "./view-controller.js";
import {} from "../views/job-list-view.js";

const jobListContainer = document.querySelector("#jobsListContainer");
const jobListElements = {
  content: {},
  header: {},
  viewElement: {},
};
const jobStatusColor = {
  Booked: { color: "#3a3af8", bgcolor: "#bdcbf4" },
  Received: { color: "#9d9205", bgcolor: "#fe0" },
  "In Progress": { color: "#00c3ff", bgcolor: "#f2f2f2" },
  Complete: { color: "#167d21", bgcolor: "#bdf4c3" },
  Collected: { color: "#6a6a6a", bgcolor: "#d4d4d4" },
  "Ordered Parts": { color: "#dc6c1a", bgcolor: "#ffd9be" },
  "Awaiting Parts to be Ordered": { color: "#b91010", bgcolor: "#fa9d9d" },
  "Awaiting Approval": { color: "#7c10b9", bgcolor: "#d393f8" },
  Cancelled: { color: "#000", bgcolor: "#989898" },
};

export function createJobListView() {}

export function updateJobListView(viewData) {}

export function statusColor(status) {
  const color = jobStatusColor[status];
  console.log("Status colour: ", color);
  return color;
}
