import fs from "fs";
import { Config } from "../types/constants";

export function makeIndexHtml() {
  const config: Config = JSON.parse(fs.readFileSync("developmentConfig.json", "utf-8"));
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <title>My React App</title>
  <script defer src="${config.SITE_PROTOCOL}${config.SITE_DOMAIN}${config.SITE_CLIENT_PORT}/main.js"></script></head>
<body>
<div id="root"></div>
</body>
</html>
`;
}
