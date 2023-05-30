import { createHeader } from "./view-controller.js";
import {} from "../views/mechanic-list-view.js";

const mechListContainer = document.querySelector("#mechanicsListContainer");
const mechListElements = {
  content: {},
  header: {},
  viewElement: {},
};
const loadingData = [
  {
    guid: 0,
    displayColor: "#d2d2d2",
    firstName: "Loading...",
  },
];

export function createMechanicListView() {
  mechListContainer.innerHTML = "";

  const mechViewElement = document.createElement("mechanic-list-view");
  mechViewElement.id = "mechanicListView";
  mechViewElement.classList.add("mechanics-view");
  mechViewElement.mechanics = loadingData;

  const mechViewContent = document.createElement("div");
  mechViewContent.classList.add("mechanic-list--content");

  mechListElements["viewElement"] = mechViewElement;
  mechListElements["content"] = mechViewContent;
  mechListElements["header"] = createHeader({ headerText: "Loading..." });

  mechListContainer.append(mechViewContent);
  mechViewContent.append(mechListElements["header"]);
  mechViewContent.append(mechViewElement);
}

export function updateMechanicListView(viewData) {
  mechListElements["header"].headerText = viewData["headerText"];
  mechListElements["viewElement"].mechanics = viewData["mechanicList"];
}
