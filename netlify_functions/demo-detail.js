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
  console.log("Demo Jobs Detail request:", event.body);

  if (body) {
    console.log(">Demo Job Detail - Has body: ");
    body["requestData"] = setShopDataParams(body["requestData"]);

    try {
      await requestJobDetail(body)
        .then((response) => {
          console.log(">Demo service data request was successful...", response);
          callback(null, {
            statusCode: 200,
            responseHeaders,
            body: JSON.stringify({
              msg: "Demo Job Service data request successful!",
              error: "errors",
              data: response,
            }),
          });
        })
        .catch((error) => console.error("Demo Job Detail Request error", error));
    } catch (error) {
      console.log(">Demo Job data - request body error", error);
      callback(null, {
        statusCode: 200,
        responseHeaders,
        body: JSON.stringify({ msg: "Failed Request", error: error }),
      });
    }
  } else {
    errors.push(new Error(">Demo job data - Request body was not well formed"));
    callback(null, {
      statusCode: 401,
      responseHeaders,
      body: JSON.stringify({ msg: "Demo Job Detail Request Failed", error: errors }),
    });
  }
};

async function requestJobDetail(requestData) {
  try {
    let shopDataResponse = {};
    shopDataResponse = responseData["response"]["resultsData"];
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

const responseData = {
  response: {
    resultsData: {
      tagNumber: "G91",
      serviceTitle: "Minor Wheel True",
      numServiceItems: "2",
      technicianGuid: "09E3AE5E939E1802974B563",
      technicianName: "Jack Comte",
      bikeGuid: "AEB15A311CEA8553A494150",
      bikeName: "Lato",
      bikeMake: "Specialized",
      bikeTypeGuid: "2DFA1AB717A510EE82281AF",
      bikeTypeName: "Mountain Bike",
      bookingComments:
        "/!\\ Lost customer contacts suit to a Cykleos bug\n\nCustomer want the wheel trued, few spokes are loose.\nAlso the customer done a tubeless conversion at Bayswater and it is leaking sealant from the nipple, install need to be redo as warranty and customer will pay only 50% or contact bayswater to cover it.",
      customerFirstName: "Preston",
      customerLastName: "Shopfloor",
      customerMobile: "0399658871",
      serviceStatus: "Collected",
      serviceItems: [
        {
          guid: "111B4ECDF873D60E307B0F0",
          itemType: "online",
          category: "online",
          shopPackageGuid: "B0FEAA2D976AE96A116B966",
          shopItemGuid: "",
          staffGuid: "",
          taxable: "0",
          taxClassId: "0",
          label: "Minor Wheel True",
          description: "Minor Wheel True",
          price: "35.00",
          quantity: "1.00",
          serviceHrsRequiredEach: "1.0",
          serviceHrsRequired: "1.0",
        },
        {
          guid: "756FD05F15DEB3DD84B5B01",
          itemType: "labor",
          category: "labor",
          shopPackageGuid: "",
          shopItemGuid: "",
          staffGuid: "",
          taxable: "0",
          taxClassId: "0",
          label: "Tubeless install warranty 50% discounted",
          description: "Tubeless install warranty 50% discounted",
          price: "17.50",
          quantity: "1.00",
          serviceHrsRequiredEach: "0.5",
          serviceHrsRequired: "0.5",
        },
      ],
    },
  },
};
