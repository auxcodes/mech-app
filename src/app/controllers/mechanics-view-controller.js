import { createHeader } from "./view-controller.js";
import {} from "../views/mechanic-list-view.js";
import { onOpenJobList } from "./event-controller.js";

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

function addMechanicButtonEvents(buttonContainer) {
  const mechButtons = buttonContainer.querySelectorAll(".mech-btn");
  mechButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      onOpenJobList(event.target.id);
    });
  });
}

export function updateMechanicListView(viewData) {
  mechListElements["viewElement"].mechanics = viewData["mechanicList"];
  mechListElements["header"].headerData = {
    headerText: viewData["headerText"],
    buttonList: [],
    currentDate: viewData["currentDate"],
  };

  addMechanicButtonEvents(mechListElements["viewElement"]);
}
