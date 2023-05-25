const functionURLs = {
  local: "http://localhost:8888/.netlify/functions/",
  prod: "https://mech.aux.codes/.netlify/functions",
};
const devenv = ["dev", "localhost", "127.0.0.1"];

export function isLocalHost(currentUrl) {
  const url = currentUrl;
  return url.includes("localhost") || url.includes("127.0.0.1");
}

export function isDev(url) {
  let result = isLocalHost(url);
  for (let env of devenv) {
    result = url.includes(env) ? true : false;
    if (result === true) {
      break;
    }
  }
  return result;
}

function getEnvironment() {
  const currentUrl = window.location.host;
  const result = isDev(currentUrl) ? "dev" : "prod";
  return result;
}

export function functionUrl() {
  let result = functionURLs.prod;
  const env = getEnvironment();
  if (env === "dev") {
    const currentUrl = window.location.host;
    result = isLocalHost(currentUrl) ? functionURLs.local : functionURLs.dev;
  }
  return result;
}
