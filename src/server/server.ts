import path from "path";
import express from "express";
import nconf from "nconf";
import { sso } from "node-expose-sspi";
import { Config, DB_CONNECTION, LINE_BREAK } from "./constants";
import { makeIndexHtml } from "./makeIndexHtml";
import { setupConfig } from "./setupConfig";
import { setupDBConnection } from "./DBHelpers/setupDBConnection";
import { setupDBModels } from "./DBHelpers/setupDBModels";
import { teamMembersRouter } from "./routers/teamMembersRouter";
import { vacationsRouter } from "./routers/vacationsRouter";

(async () => {
  setupConfig();
  const dbConnection = await setupDBConnection();
  await setupDBModels(dbConnection);
  const port = nconf.get(Config.SITE_SERVER_PORT);

  const server = express();
  server.set(DB_CONNECTION, dbConnection);

  server.use(sso.auth());
  server.use((req, res, next) => {
    if (!process.env.password || !process.env.login) {
      console.log(LINE_BREAK);
      console.log("Missing credentials inside environmental variables");
      console.log(LINE_BREAK);
      process.exit();
    }
    next();
  });
  if (process.env.mode === "production") {
    server.use(express.static("dist"));
  }
  server.use("/team-members", teamMembersRouter);
  server.use("/vacations", vacationsRouter);

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
})();
