import path from "path";
import * as fs from "fs";
import express from "express";
import { makeIndexHtml } from "./makeIndexHtml";
//extract + rename
const config = JSON.parse(fs.readFileSync("developmentConfig.json", "utf-8"));
const server = express();
const port = config.serverPort;

server.listen(port, () => {
  console.log(`The app server is running on port: ${port}`);
});

server.post("/plan-vacation", (req, res) => {
  res.set("Content-Type", "application/json");
  res.send({ message: "saved to db" });
});

server.get("/main.js", (req, res) => {
  if (process.env.mode === "production") {
    res.sendFile(path.resolve(__dirname, ".././dist/main.js"));
  }
});

server.get("*", (req, res) => {
  if (process.env.mode === "development") {
    res.send(makeIndexHtml());
  } else {
    res.sendFile(path.resolve(__dirname, ".././dist/index.html"));
  }
});
//TODO: study rest API
