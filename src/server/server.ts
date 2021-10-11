import path from "path";
import express from "express";
import nconf from "nconf";
import { Config } from "../types/constants";
import { makeIndexHtml } from "./makeIndexHtml";
import { setupConfig } from "./setupConfig";

setupConfig();

const server = express();
const port = nconf.get(Config.serverPort);

server.listen(port, () => {
  console.log(`The app server is running on port: ${port}`);
});

server.post("/plan-vacation", (req, res) => {
  res.set("Content-Type", "application/json");
  res.send({ message: "saved to db" });
});

server.get("/main.js", (req, res) => {
  if (process.env.mode === "production") {
    res.sendFile(path.resolve(__dirname, "../main.js"));
  }
});

server.get("*", (req, res) => {
  if (process.env.mode === "development") {
    res.send(makeIndexHtml());
  } else {
    res.sendFile(path.resolve(__dirname, "../index.html"));
  }
});
//TODO: study rest API
