import { createHeader } from "./view-controller.js";

const mechListContainer = document.querySelector("#mechanicsListContainer");
const mechListElements = {
  content: {},
  header: {},
  viewElement: {},
};

export function createMechanicListView() {
  mechListContainer.innerHTML = "";

  const mechViewElement = document.createElement("ul");
  mechViewElement.id = "mechanicListView";
  mechViewElement.classList.add("mechanics-view");

  const li = document.createElement("li");
  const button = document.createElement("mechanic-button");
  button.mechButton = {
    guid: 0,
    displayColor: "#d2d2d2",
    firstName: "Loading...",
  };
  li.append(button);
  mechViewElement.append(li);

  const mechViewContent = document.createElement("div");
  mechViewContent.classList.add("mechanic-list--content");

  mechListElements["viewElement"] = mechViewElement;
  mechListElements["content"] = mechViewContent;
  mechListElements["header"] = createHeader({ headerText: "Loading..." });

  mechListContainer.append(mechViewContent);
  mechViewContent.append(mechListElements["header"]);
  mechViewContent.append(mechViewElement);
}

export function updateMechanicListView() {
  //   mechListElements["viewElement"] = mechViewElement;
  //   mechListElements["content"] = mechViewContent;
  mechListElements["header"].headerText = { headerText: "New Text" };
}
