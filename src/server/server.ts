import express from "express";
import cors from "cors";
import config from "../../.env.development.json";

const server = express();
const port = config.serverPort;

server.listen(port, () => {
  console.log(`The app server is running on port: ${port}`);
});

if (process.env.mode == "development") {
  server.use(cors());
}

server.post("/plan-vacation", (req, res) => {
  res.set("Content-Type", "application/json");
  res.send({ message: "saved to db" });
});

server.get("*", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <title>My React App</title>
  <script defer src="http://localhost:3001/main.js"></script></head>
<body>
<div id="root"></div>
</body>
</html>
`);
});
//TODO: study rest API
