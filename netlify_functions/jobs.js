const shopDataParams = {
  command: process.env.DATA_COMMAND,
  uid: "",
  lid: "",
  requestId: "",
  sessionToken: process.env.SESSION_TOKEN,
  firstOfMonthDate: "",
  date: "",
  closeSession: "1",
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
const requestUrl = coreUrl + process.env.LOGIN_PATH;

exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  console.log("Jobs request:", event.body);

  if (body) {
    console.log("> Jobs - Has body: ");

    try {
      await requestShopData(body)
        .then((response) => {
          console.log("> Shop data request was successful...", response);
          callback(null, {
            statusCode: 200,
            responseHeaders,
            body: JSON.stringify({
              msg: "Shop data request successful!",
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
        .catch((error) => console.error("Login error", error));
    } catch (error) {
      console.log("> Jobs - request body error", error);
      callback(null, {
        statusCode: 200,
        responseHeaders,
        body: JSON.stringify({ msg: "Failed Request", error: error }),
      });
    }
  } else {
    errors.push(new Error("> Jos - Request body was not well formed"));
    callback(null, {
      statusCode: 401,
      responseHeaders,
      body: JSON.stringify({ msg: "Validation Failed", error: errors }),
    });
  }
};

async function requestShopData(requestData) {
  const urlEncoding = new URLSearchParams(requestData["requestData"]);
  shopDataHeader["Cookie"] = requestData["cookie"];
  console.log("Shop data request: ", urlEncoding.toString());
  try {
    let shopDataResponse = {};
    await fetch(requestUrl, {
      method: "POST",
      headers: shopDataHeader,
      body: urlEncoding,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Shop data response: ", data);
        shopDataResponse = formatData(data["response"]["resultsData"]);
      })
      .catch((error) => console.error("Job request failed", error));
    return shopDataResponse;
  } catch (error) {
    return error;
  }
}

function formatData(allShopData) {
  console.log("> Formate Data", allShopData["suburb"]);
  const formatedData = {
    shopName: allShopData["suburb"],
    jobsList: {
      ...allShopData["itemsScheduled"],
    },
    mechanics: {
      ...allShopData["staffList"],
    },
  };
  return formatedData;
}
