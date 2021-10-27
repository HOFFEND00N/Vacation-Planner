import nconf from "nconf";
import { CONFIG } from "../constants";

export function makeIndexHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <title>My React App</title>
  <script defer src="${nconf.get(CONFIG.SITE_PROTOCOL)}${nconf.get(CONFIG.SITE_DOMAIN)}${nconf.get(
    CONFIG.SITE_CLIENT_PORT
  )}/main.js"></script></head>
<body>
<div id="root"></div>
</body>
</html>
`;
}
