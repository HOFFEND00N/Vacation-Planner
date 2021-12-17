import nconf from "nconf";
import { Config } from "../constants";

export const makeIndexHtml = () => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <title>My React App</title>
  <script defer src="${nconf.get(Config.SITE_PROTOCOL)}${nconf.get(Config.SITE_DOMAIN)}${nconf.get(
    Config.SITE_CLIENT_PORT
  )}/main.js"></script></head>
<body>
<div id="root"></div>
</body>
</html>
`;
};
