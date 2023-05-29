const shopDataParams = {
  command: process.env.DETAIL_COMMAND,
  uid: "",
  lid: "",
  sid: "",
  requestId: "",
  sessionToken: process.env.SESSION_TOKEN,
  activityFilter: "",
  _: 0,
};

const responseHeaders = {
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Headers": "Authorization",
};

const shopDataHeader = {
  "User-Agent": "NodeJS/1.0",
  "Content-Type": "application/x-www-form-urlencoded",
  Cookie: "",
};

const coreUrl = process.env.SERVER_URL;
const requestUrl = coreUrl + process.env.SERVICE_PATH;

exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  console.log("Jobs Detail request:", event.body);

  if (body) {
    console.log("> Job Detail - Has body: ");
    body["requestData"] = setShopDataParams(body["requestData"]);

    try {
      await requestJobDetail(body)
        .then((response) => {
          console.log("> Service data request was successful...", response);
          callback(null, {
            statusCode: 200,
            responseHeaders,
            body: JSON.stringify({
              msg: "Service data request successful!",
              error: "errors",
              data: response,
              // data: {
              //   responseId: "A319A69088A10EABCE9F751",
              //   inResponseToId: "63b1ed4f7bc7a434ed83",
              //   status: "error",
              //   timeStamp: "1685314115",
              //   resultsData: {
              //     message: "Session Token invalid, please login again.",
              //   },
              // },
            }),
          });
        })
        .catch((error) => console.error("Request error", error));
    } catch (error) {
      console.log("> Job data - request body error", error);
      callback(null, {
        statusCode: 200,
        responseHeaders,
        body: JSON.stringify({ msg: "Failed Request", error: error }),
      });
    }
  } else {
    errors.push(new Error("> Job data - Request body was not well formed"));
    callback(null, {
      statusCode: 401,
      responseHeaders,
      body: JSON.stringify({ msg: "Request Failed", error: errors }),
    });
  }
};

async function requestJobDetail(requestData) {
  const urlEncoding = new URLSearchParams(requestData["requestData"]);
  shopDataHeader["Cookie"] = requestData["cookie"];
  console.log("Serice data request: ", urlEncoding.toString());
  try {
    let shopDataResponse = {};
    await fetch(requestUrl, {
      method: "POST",
      headers: shopDataHeader,
      body: urlEncoding,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Service data response: ", data);
        shopDataResponse = data["response"]["resultsData"];
      })
      .catch((error) => console.error("Job data request failed", error));
    return shopDataResponse;
  } catch (error) {
    return error;
  }
}

function setShopDataParams(serviceDetail) {
  shopDataParams["uid"] = serviceDetail["uid"];
  shopDataParams["lid"] = serviceDetail["lid"];
  shopDataParams["sid"] = serviceDetail["sid"];
  shopDataParams["requestId"] = serviceDetail["requestId"];
  shopDataParams["activityFilter"] = "";
  shopDataParams["_"] = serviceDetail["_"];
  return shopDataParams;
}
