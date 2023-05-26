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
} from "./view-controller.js";
import { authUser, loginErrorState } from "./user-auth.js";

window.onLoginClicked = onLoginClicked;
window.onOpenJobList = onOpenJobList;
window.onOpenJobDetail = onOpenJobDetail;
window.onBackClicked = onBackClicked;
window.onRefreshClicked = onRefreshClicked;
window.onViewPassword = onViewPassword;

loadViews();

function loadViews() {
  loginView(loginErrorState());
  const loginForm = document.getElementById("login-form");
  loginForm.onsubmit = (event) => {
    event.preventDefault();
    onLoginClicked(event.target["uname"].value, event.target["pword"].value);
  };
}

function onLoginClicked(username, password) {
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

function onOpenJobList(mechGuid) {
  generateJobsList(mechGuid);
  toggleMechanicButtons();
  toggleJobList();
}

function onOpenJobDetail(jobGuid) {
  generateJobDetail(jobGuid);
  toggleJobList();
  toggleJobDetail();
}

function onBackClicked(buttonId) {
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

function onRefreshClicked(refreshParam) {
  refreshJobList(refreshParam);
}

function onViewPassword() {
  toggleViewPassword();
}
