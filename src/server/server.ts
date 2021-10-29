import path from "path";
import express from "express";
import nconf from "nconf";
import { sso } from "node-expose-sspi";
import { CONFIG, MODELS_NAMES } from "../constants";
import { makeIndexHtml } from "./makeIndexHtml";
import { setupConfig } from "./setupConfig";
import { setupDBConnection } from "./DBHelpers/setupDBConnection";
import { setupDBModels } from "./DBHelpers/setupDBModels";

(async () => {
  setupConfig();
  const dbConnection = await setupDBConnection();
  setupDBModels(dbConnection);
  const port = nconf.get(CONFIG.SITE_SERVER_PORT);

  const server = express();

  server.use(sso.auth());
  server.use(express.static("dist"));

  server.get("/user", async (req, res) => {
    const currentUser = await dbConnection.models[MODELS_NAMES.USER].findAll();
    res.send({ user: currentUser[0] });
  });

  server.post("/plan-vacation", (req, res) => {
    res.set("Content-Type", "application/json");
    res.send({ message: "saved to db" });
  });

  server.get("*", (req, res) => {
    if (process.env.mode === "development") {
      res.send(makeIndexHtml());
    } else {
      res.sendFile(path.resolve(__dirname, "../index.html"));
    }
  });

  server.listen(port, () => {
    console.log(`The app server is running on port: ${port}`);
  });
  //TODO: study rest API
})();
