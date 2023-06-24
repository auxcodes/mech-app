import { createHeader } from "./view-controller.js";
import {} from "../views/job-list-view.js";

const jobListContainer = document.querySelector("#jobsListContainer");
const jobListElements = {
  content: {},
  header: {},
  viewElement: {},
};
const jobStatusColor = {
  booked: { color: "#fff", bgcolor: "#3a3af8" },
  received: { color: "#fff", bgcolor: "#f0e217" },
  inProgress: { color: "#fff", bgcolor: "#00c3ff" },
  complete: { color: "#fff", bgcolor: "#167d21" },
  collected: { color: "#fff", bgcolor: "#6a6a6a" },
  orderedParts: { color: "#fff", bgcolor: "#b95710" },
  toOrderParts: { color: "#fff", bgcolor: "#b91010" },
  cancelled: { color: "#fff", bgcolor: "#000" },
};

export function createJobListView() {}

export function updateJobListView(viewData) {}
