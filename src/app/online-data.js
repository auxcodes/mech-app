import { functionUrl } from "./environment.js";

const shopParam = { data: {} };
const jobParam = {
  data: {
    uid: "",
    lid: "",
    sid: "",
    requestId: "",
    _: 0,
  },
};

export async function shopData(requestData) {
  shopParam["data"] = requestData;
  let result = {};
  await fetch(functionUrl() + "/jobs", {
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Shop Data Request successful!");
      result = data;
    })
    .catch((error) => {
      console.error("Job request failed", error);
      if (error.includes("NetworkError")) {
        result = {
          msg: "Error Occured",
          error: "A Network Error has occurred :(",
        };
      }
    });
  return result;
}

export async function jobDetail(jobGuid) {
  const data = shopParam["data"]["requestData"];
  const requestData = {
    cookie: shopParam["data"]["cookie"],
    requestData: {
      uid: data["uid"],
      lid: data["lid"],
      sid: jobGuid,
      requestId: data["requestId"],
      _: data["_"],
    },
  };

  let result = {};
  await fetch(functionUrl() + "/job-detail", {
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Job Detail Request successful!");
      result = data;
    })
    .catch((error) => console.error("Job request failed", error));
  return result;
}
