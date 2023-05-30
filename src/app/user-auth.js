import { functionUrl } from "./environment.js";

const authError = { email: "", error: "" };

export async function authUser(loginData) {
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
