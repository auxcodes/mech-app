import { demoModeOn } from "./controllers/data-controller.js";
import { functionUrl } from "./environment.js";

const authError = { email: "", error: "" };
const demoUser = { email: "demo@demo", password: "demo" };

export async function authUser(loginData) {
  if (isDemoUser(loginData)) {
    console.log("Demo user login");
    return demoAuthUser();
  }
  console.log("Auth user login");
  let result = null;
  const jobsRequest = await fetch(functionUrl() + "/auth", {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Auth Request successful!", data);
      authError.error = "";
      result = data["data"];
    })
    .catch((error) => {
      console.error("Job request failed", error);
      authError.email = loginData.email;
      authError.error = "Login was unsuccessful.";
    });
  return result;
}

export function loginErrorState() {
  return authError;
}

function isDemoUser(loginData) {
  return loginData.email === demoUser.email && loginData.password === demoUser.password;
}

export async function demoAuthUser() {
  let result = null;
  const jobsRequest = await fetch(functionUrl() + "/demo", {
    method: "POST",
    body: JSON.stringify(demoUser),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Demo Request successful!", data);
      demoModeOn();
      authError.error = "";
      result = data["data"];
    })
    .catch((error) => {
      console.error("Demo request failed", error);
      authError.email = demoUser.email;
      authError.error = "Login was unsuccessful.";
    });
  return result;
}
