import config from "../../.env.development.json";

export function makeIndexHtml() {
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
