import express from "express";
import cors from "cors";
import config from "../../.env.development.json";
import { makeIndexHtml } from "./makeIndexHtml";

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
  res.send(makeIndexHtml());
});
//TODO: study rest API
