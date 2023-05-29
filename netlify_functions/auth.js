const responseHeaders = {
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Headers": "Authorization",
};

const cookieHeader = {
  "User-Agent": "NodeJS/1.0",
  Accept: "*/*",
  Connection: "keep-alive",
};

const loginHeader = {
  "User-Agent": "NodeJS/1.0",
  "Content-Type": "application/x-www-form-urlencoded",
  Cookie: "",
};

const loginParams = {
  command: process.env.LOGIN_COMMAND,
  requestId: process.env.REQUEST_ID,
  sessionToken: process.env.SESSION_TOKEN,
  email: "",
  password: "",
  validationCode: "",
};

const coreUrl = process.env.SERVER_URL;
const loginUrl = coreUrl + process.env.LOGIN_PATH;

let currentCookie = "";

const shopDataParams = {
  cookie: "",
  requestData: {
    command: process.env.DATA_COMMAND,
    uid: "",
    lid: "",
    requestId: "",
    sessionToken: process.env.SESSION_TOKEN,
    firstOfMonthDate: "2023-05-01",
    date: "2023-05-04",
    closeSession: "1",
    _: "1683189251809",
  },
};

exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  console.log("Auth request:", event.body);

  if (body) {
    console.log("> Auth - Has body: ");

    try {
      if (currentCookie.length === 0) {
        await getCookie();
      }
      // else we already have cookie
      loginParams["email"] = body["email"];
      loginParams["password"] = body["password"];
      await login()
        .then((response) => {
          console.log("> Login was successful...", response);
          callback(null, {
            statusCode: 200,
            responseHeaders,
            body: JSON.stringify({
              msg: "Validation Successful",
              error: "errors",
              data: response,
            }),
          });
        })
        .catch((error) => console.error("Login error", error));
    } catch (error) {
      console.log("> Jobs - valid email error", error);
      callback(null, {
        statusCode: 200,
        responseHeaders,
        body: JSON.stringify({ msg: "Failed Send", error: error }),
      });
    }
  } else {
    errors.push(new Error("> FBA - Email was not valid"));
    callback(null, {
      statusCode: 401,
      responseHeaders,
      body: JSON.stringify({ msg: "Validation Failed", error: errors }),
    });
  }
};

async function getCookie() {
  console.log("Get Cookie... ");
  await fetch(coreUrl, {
    headers: cookieHeader,
  })
    .then((result) => {
      console.log("> Got Cookie...");
      const sessID = result.headers.get("set-cookie");
      currentCookie = sessID.split(";")[0] + ";";
      console.log("> New cookie: ", currentCookie);
      loginHeader["Cookie"] = currentCookie;
    })
    .catch((error) => console.error("Get Cookie Failed: ", error));
}

async function login() {
  const urlEncoding = new URLSearchParams(loginParams);
  console.log("Login: ", currentCookie, " ... ", urlEncoding.toString());
  try {
    let loginResult = undefined;
    await fetch(loginUrl, {
      method: "POST",
      headers: loginHeader,
      body: urlEncoding,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response data: ", data);
        if (data["response"]["status"] === "success") {
          loginResult = setShopDataParams(data);
        }
      })
      .catch((error) => console.error("Job request failed", error));
    return loginResult;
  } catch (error) {
    return error;
  }
}

function setShopDataParams(responseData) {
  const resultsData = responseData["response"]["resultsData"];
  console.log("Set shop data: ", resultsData);
  shopDataParams["cookie"] = currentCookie;
  shopDataParams.requestData["uid"] = resultsData["guid"];
  shopDataParams.requestData["lid"] = resultsData["lid"];
  shopDataParams.requestData["requestId"] = requestID();
  shopDataParams.requestData["firstOfMonthDate"] = firstOfMonth();
  shopDataParams.requestData["date"] = todaysDate();
  shopDataParams.requestData["_"] = Date.now();
  return shopDataParams;
}

function yearMonth() {
  const now = new Date();
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  return now.getFullYear() + "-" + month + "-";
}

function firstOfMonth() {
  return yearMonth() + "01";
}

function todaysDate() {
  const now = new Date();
  const day = ("0" + new Date().getDate()).slice(-2);
  return yearMonth() + day;
}

function requestID() {
  const id = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return id() + id() + id() + id() + id();
}
