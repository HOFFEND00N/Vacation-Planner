import fs from "fs";

export function makeIndexHtml() {
  const config = JSON.parse(fs.readFileSync("developmentConfig.json", "utf-8"));
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <title>My React App</title>
  <script defer src="${config.protocol}${config.domain}${config.clientPort}/main.js"></script></head>
<body>
<div id="root"></div>
</body>
</html>
`;
}
