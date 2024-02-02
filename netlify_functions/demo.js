const responseHeaders = {
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Headers": "Authorization",
};

const shopDataParams = {
  cookie: "",
  requestData: {
    command: process.env.DATA_COMMAND,
    uid: "demo",
    lid: "demo",
    requestId: "demo",
    sessionToken: process.env.SESSION_TOKEN,
    firstOfMonthDate: "2023-05-01",
    date: "2023-05-04",
    closeSession: "1",
    _: "1683189251809",
  },
};

exports.handler = async (event, context, callback) => {
  console.log("Demo request:", event.body);
  const body = JSON.parse(event.body);

  if (body) {
    console.log("> Demo - Has body: ");
    try {
      callback(null, {
        statusCode: 200,
        responseHeaders,
        body: JSON.stringify({
          msg: "Validation Successful",
          error: "errors",
          data: shopDataParams,
        }),
      });
    } catch (error) {
      console.log("> Demo - valid email error", error);
      callback(null, {
        statusCode: 200,
        responseHeaders,
        body: JSON.stringify({ msg: "Failed Send", error: error }),
      });
    }
  } else {
    errors.push(new Error("> Demo - No body sent"));
    callback(null, {
      statusCode: 401,
      responseHeaders,
      body: JSON.stringify({ msg: "Validation Failed", error: errors }),
    });
  }
};
