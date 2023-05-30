import {
  loginView,
  generateMechanicList,
  generateJobsList,
  generateJobDetail,
  toggleJobDetail,
  toggleJobList,
  toggleMechanicButtons,
  toggleLogin,
  toggleViewPassword,
  refreshJobList,
  toggleLoginError,
  resetSite,
} from "./view-controller.js";

import { authUser } from "../user-auth.js";

export function onLoginClicked(username, password) {
  const loginData = { email: username, password: password };
  authUser(loginData)
    .then((data) => {
      //console.log("Main - authUser response: ", data);
      if (data) {
        toggleLoginError(0);
        generateMechanicList(data);
        toggleLogin();
        toggleMechanicButtons();
      } else {
        loginView({
          email: username,
          error: "Login was unsuccessful!",
          opacity: 1,
        });
      }
    })
    .catch((error) => console.error("Main - authUser failed: ", error));
}

export function onOpenJobList(mechGuid) {
  generateJobsList(mechGuid);
  toggleMechanicButtons();
  toggleJobList();
}

export function onOpenJobDetail(jobGuid) {
  generateJobDetail(jobGuid);
  toggleJobList();
  toggleJobDetail();
}

export function onBackClicked(buttonId) {
  if (buttonId === "jobs") {
    toggleJobList();
    toggleJobDetail();
    return;
  }
  if (buttonId === "mechs") {
    toggleMechanicButtons();
    toggleJobList();
  }
}

export function onRefreshClicked(refreshParam) {
  refreshJobList(refreshParam);
}

export function onViewPassword() {
  toggleViewPassword();
}

export function onSessionExpired() {
  loginView({
    email: "",
    error: "Session Expired, login in again.",
    opacity: 1,
  });
  resetSite();
}
