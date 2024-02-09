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
    serviceId = body["requestData"]["sid"];

    try {
      await requestJobDetail(serviceId)
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

async function requestJobDetail(sid) {
  try {
    let shopDataResponse = {};
    shopDataResponse = responseData["data"].find((job) => job.serviceGuid === sid);
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
  data: [
    {
      serviceGuid: "0421F83AB51AED49AA16EAD",
      tagNumber: "G91",
      serviceTitle: "Minor Wheel True",
      numServiceItems: "2",
      bikeName: "Lato",
      bikeMake: "Specialized",
      bookingComments:
        "Customer want the wheel trued, few spokes are loose.\n- Also the customer done a tubeless conversion at another store and it is leaking sealant from the nipple\n- Install needs to be redone as warranty and customer will pay only 50%, perhaps call other store to cover costs.",
      customerFirstName: "Ben",
      customerLastName: "Green",
      customerMobile: "0412345678",
      serviceStatus: "Received",
      serviceItems: [
        {
          guid: "111B4ECDF873D60E307B0F0",
          itemType: "online",
          category: "online",
          shopPackageGuid: "B0FEAA2D976AE96A116B966",
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
    {
      serviceGuid: "23F9B285B5897BEAC82BCFE",
      tagNumber: "G12",
      serviceTitle: "Standard Plus",
      numServiceItems: "6",
      bikeName: "E-City",
      bikeMake: "XDS",
      bookingComments: "Standard Plus e-bike service",
      customerFirstName: "Russell",
      customerLastName: "Lockwood",
      customerMobile: "0412345678",
      serviceStatus: "Awaiting Approval",
      serviceItems: [
        {
          guid: "0",
          itemType: "online",
          category: "online",
          shopPackageGuid: "0",
          taxable: "0",
          taxClassId: "0",
          label: "Standard Plus",
          description: "Standard Plus",
          price: "169.00",
          quantity: "1.00",
          serviceHrsRequiredEach: "1.0",
          serviceHrsRequired: "1.0",
        },
        {
          guid: "0",
          itemType: "online",
          category: "online",
          shopPackageGuid: "0",
          taxable: "0",
          taxClassId: "0",
          label: "Brake Pads",
          description: "Brake Pads",
          price: "29.00",
          quantity: "1.00",
          serviceHrsRequiredEach: "0",
          serviceHrsRequired: "0",
        },
      ],
    },
    {
      serviceGuid: "4EE9A55A65E86F3A80D38DD",
      tagNumber: "G33",
      serviceTitle: "Standard Plus",
      numServiceItems: "1",
      bikeName: "Merida",
      bikeMake: "Merida",
      bookingComments: "Standard Plus service",
      customerFirstName: "Koi",
      customerLastName: "Tyrrell",
      customerMobile: "0412345678",
      serviceStatus: "Received",
      serviceItems: [
        {
          guid: "0",
          itemType: "online",
          category: "online",
          shopPackageGuid: "0",
          taxable: "0",
          taxClassId: "0",
          label: "Standard Plus",
          description: "Standard Plus",
          price: "169.00",
          quantity: "1.00",
          serviceHrsRequiredEach: "1.0",
          serviceHrsRequired: "1.0",
        },
        {
          guid: "0",
          itemType: "online",
          category: "online",
          shopPackageGuid: "0",
          taxable: "0",
          taxClassId: "0",
          label: "Chain",
          description: "Chain",
          price: "29.00",
          quantity: "1.00",
          serviceHrsRequiredEach: "0",
          serviceHrsRequired: "0",
        },
      ],
    },
    {
      serviceGuid: "55E8DDB9FFF22E74ABEF2BA",
      tagNumber: "G15",
      serviceTitle: "Standard Service",
      numServiceItems: "1",
      bikeName: "Merida eSilex 400 2021",
      bikeMake: "Merida",
      bookingComments:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n- Nulla nec purus feugiat, molestie ipsum et, consequat nunc. Nulla facilisi.\n- Nulla nec purus feugiat, molestie ipsum et, consequat nunc.\n- Nulla facilisi.\n- Nulla nec purus feugiat, molestie ipsum et, consequat nunc. \n- Nulla facilisi. Nulla nec purus feugiat, molestie ipsum et, consequat nunc. \n- Nulla facilisi. Nulla nec purus feugiat, molestie ipsum et, consequat nunc. Nulla facilisi. Nulla nec purus feugiat, molestie ipsum et, consequat nunc. Nulla facilisi. Nulla nec purus feugiat, molestie ipsum et, consequat nunc. Nulla facilisi. Nulla nec purus feugiat, molestie ipsum et, consequat nunc. Nulla facilisi. Nulla nec purus feugiat, molestie ipsum et, consequat nunc. Nulla facilisi. Nulla nec purus feugiat, molestie ipsum et, consequat nunc. Nulla facilisi.",
      customerFirstName: "James",
      customerLastName: "Eastwood",
      customerMobile: "0412345678",
      serviceStatus: "Received",
      serviceItems: [
        {
          guid: "0",
          itemType: "online",
          category: "online",
          shopPackageGuid: "0",
          taxable: "0",
          taxClassId: "0",
          label: "Standard Service",
          description: "Standard Service",
          price: "119.00",
          quantity: "1.00",
          serviceHrsRequiredEach: "1.0",
          serviceHrsRequired: "1.0",
        },
        {
          guid: "0",
          itemType: "online",
          category: "online",
          shopPackageGuid: "0",
          taxable: "0",
          taxClassId: "0",
          label: "Chain",
          description: "Chain",
          price: "29.00",
          quantity: "1.00",
          serviceHrsRequiredEach: "0",
          serviceHrsRequired: "0",
        },
        {
          guid: "0",
          itemType: "online",
          category: "online",
          shopPackageGuid: "0",
          taxable: "0",
          taxClassId: "0",
          label: "Cassette",
          description: "Cassette",
          price: "36.00",
          quantity: "1.00",
          serviceHrsRequiredEach: "0",
          serviceHrsRequired: "0",
        },
      ],
    },
    {
      serviceGuid: "64A4367E0E058BACA32447B",
      tagNumber: "G179",
      serviceTitle: "Ultimate Service",
      numServiceItems: "7",
      bikeName: "Siskiu",
      bikeMake: "Polygon",
      bookingComments:
        "Ultimate Service.\n- Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n- Nulla nec purus feugiat, molestie ipsum et, consequat nunc. Nulla facilisi.",
      customerFirstName: "Ben",
      customerLastName: "Vandendriesen",
      customerMobile: "0412345678",
      serviceStatus: "Complete",
      serviceItems: [
        {
          guid: "0",
          itemType: "online",
          category: "online",
          shopPackageGuid: "0",
          taxable: "0",
          taxClassId: "0",
          label: "Ultimate Service",
          description: "Ultimate Service",
          price: "299.00",
          quantity: "1.00",
          serviceHrsRequiredEach: "1.0",
          serviceHrsRequired: "1.0",
        },
        {
          guid: "0",
          itemType: "online",
          category: "online",
          shopPackageGuid: "0",
          taxable: "0",
          taxClassId: "0",
          label: "Chain",
          description: "Chain",
          price: "29.00",
          quantity: "1.00",
          serviceHrsRequiredEach: "0",
          serviceHrsRequired: "0",
        },
        {
          guid: "0",
          itemType: "online",
          category: "online",
          shopPackageGuid: "0",
          taxable: "0",
          taxClassId: "0",
          label: "Cassette",
          description: "Cassette",
          price: "36.00",
          quantity: "1.00",
          serviceHrsRequiredEach: "0",
          serviceHrsRequired: "0",
        },
        {
          guid: "0",
          itemType: "online",
          category: "online",
          shopPackageGuid: "0",
          taxable: "0",
          taxClassId: "0",
          label: "Brake Pads",
          description: "Brake Pads",
          price: "29.00",
          quantity: "2.00",
          serviceHrsRequiredEach: "0",
          serviceHrsRequired: "0",
        },
      ],
    },
    {
      serviceGuid: "91FEA9A3685C727E163A187",
      tagNumber: "",
      serviceTitle: "Standard Service",
      numServiceItems: "1",
      bikeName: "",
      bikeMake: "Pedal, Jet, Black",
      bookingComments:
        "Standard Service.\n- Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n- Nulla nec purus feugiat, molestie ipsum et, consequat nunc.\n- Nulla facilisi.",
      customerFirstName: "Musa",
      customerLastName: "De Abreu",
      customerMobile: "0412345678",
      serviceStatus: "Booked",
      serviceItems: [
        {
          guid: "0",
          itemType: "online",
          category: "online",
          shopPackageGuid: "0",
          taxable: "0",
          taxClassId: "0",
          label: "Standard Service",
          description: "Standard Service",
          price: "119.00",
          quantity: "1.00",
          serviceHrsRequiredEach: "1.0",
          serviceHrsRequired: "1.0",
        },
        {
          guid: "0",
          itemType: "online",
          category: "online",
          shopPackageGuid: "0",
          taxable: "0",
          taxClassId: "0",
          label: "Chain",
          description: "Chain",
          price: "29.00",
          quantity: "1.00",
          serviceHrsRequiredEach: "0",
          serviceHrsRequired: "0",
        },
      ],
    },
    {
      serviceGuid: "9952BB23FF97EAF2BABB5E3",
      tagNumber: "G188",
      serviceTitle: "Accessory Installation Basic",
      numServiceItems: "4",
      bikeName: "n/a",
      bikeMake: "ByK",
      bookingComments:
        "Accessory Install.\n- Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n- Nulla nec purus feugiat, molestie ipsum et, consequat nunc. \n- Nulla facilisi.",
      customerFirstName: "Fiona",
      customerLastName: "Van",
      customerMobile: "0412345678",
      serviceStatus: "Cancelled",
      serviceItems: [
        {
          guid: "0",
          itemType: "online",
          category: "online",
          shopPackageGuid: "0",
          taxable: "0",
          taxClassId: "0",
          label: "Accessory Installation Basic",
          description: "Accessory Installation Basic",
          price: "20.00",
          quantity: "1.00",
          serviceHrsRequiredEach: "1.0",
          serviceHrsRequired: "1.0",
        },
      ],
    },
    {
      serviceGuid: "AF94E202628427F1DBB8B43",
      tagNumber: "G31",
      serviceTitle: "Standard Plus",
      numServiceItems: "2",
      bikeName: "Crystal",
      bikeMake: "Apollo",
      bookingComments:
        "Standard Plus.\n- Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n- Nulla nec purus feugiat, molestie ipsum et, consequat nunc. Nulla facilisi.",
      customerFirstName: "Patrick",
      customerLastName: "Muto",
      customerMobile: "0412345678",
      serviceStatus: "Complete",
      serviceItems: [
        {
          guid: "0",
          itemType: "online",
          category: "online",
          shopPackageGuid: "0",
          taxable: "0",
          taxClassId: "0",
          label: "Standard Plus",
          description: "Standard Plus",
          price: "169.00",
          quantity: "1.00",
          serviceHrsRequiredEach: "1.0",
          serviceHrsRequired: "1.0",
        },
        {
          guid: "0",
          itemType: "online",
          category: "online",
          shopPackageGuid: "0",
          taxable: "0",
          taxClassId: "0",
          label: "Chain",
          description: "Chain",
          price: "29.00",
          quantity: "1.00",
          serviceHrsRequiredEach: "0",
          serviceHrsRequired: "0",
        },
        {
          guid: "0",
          itemType: "online",
          category: "online",
          shopPackageGuid: "0",
          taxable: "0",
          taxClassId: "0",
          label: "Cassette",
          description: "Cassette",
          price: "36.00",
          quantity: "1.00",
          serviceHrsRequiredEach: "0",
          serviceHrsRequired: "0",
        },
      ],
    },
    {
      serviceGuid: "DBB680F9860EDF62494A633",
      tagNumber: "G01",
      serviceTitle: "Standard Service",
      numServiceItems: "3",
      bikeName: "Stinky",
      bikeMake: "Surly",
      bookingComments:
        "Standard Service.\n- Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n- Nulla nec purus feugiat, molestie ipsum et, consequat nunc. \n- Nulla facilisi.",
      customerFirstName: "Doug",
      customerLastName: "Hendry",
      customerMobile: "0412345678",
      serviceStatus: "Complete",
      serviceItems: [
        {
          guid: "0",
          itemType: "online",
          category: "online",
          shopPackageGuid: "0",
          taxable: "0",
          taxClassId: "0",
          label: "Standard Service",
          description: "Standard Service",
          price: "119.00",
          quantity: "1.00",
          serviceHrsRequiredEach: "1.0",
          serviceHrsRequired: "1.0",
        },
        {
          guid: "0",
          itemType: "online",
          category: "online",
          shopPackageGuid: "0",
          taxable: "0",
          taxClassId: "0",
          label: "Chain",
          description: "Chain",
          price: "40.00",
          quantity: "1.00",
          serviceHrsRequiredEach: "0",
          serviceHrsRequired: "0",
        },
      ],
    },
    {
      serviceGuid: "FDA73A184E40FACE7D07CA7",
      tagNumber: "G21",
      serviceTitle: "Brake lever installation",
      numServiceItems: "3",
      bikeName: "Scooter",
      bikeMake: "Scooter",
      bookingComments:
        "Brake lever install on scooter. \n- Customer will drop off the scooter at 10am and pick up at 12pm. \n- Customer will pay cash.",
      customerFirstName: "Matt",
      customerLastName: "Song",
      customerMobile: "0412345678",
      serviceStatus: "Awaiting Approval",
      serviceItems: [
        {
          guid: "0",
          itemType: "online",
          category: "online",
          shopPackageGuid: "0",
          taxable: "0",
          taxClassId: "0",
          label: "Brake lever installation",
          description: "Brake lever installation",
          price: "20.00",
          quantity: "1.00",
          serviceHrsRequiredEach: "1.0",
          serviceHrsRequired: "1.0",
        },
      ],
    },
  ],
};
