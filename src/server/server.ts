import path from "path";
import express from "express";
import nconf from "nconf";
import { sso } from "node-expose-sspi";
import bodyParser from "body-parser";
import { Config, LINE_BREAK } from "../constants";
import { makeIndexHtml } from "./makeIndexHtml";
import { setupConfig } from "./setupConfig";
import { setupDBConnection } from "./DBHelpers/setupDBConnection";
import { setupDBModels } from "./DBHelpers/setupDBModels";
import { getTeamMembers } from "./ADHelpers/getTeamMembers";
import { getTeamVacations } from "./DBHelpers/getTeamVacations";
import { createVacation } from "./DBHelpers/createVacation";

(async () => {
  setupConfig();
  const dbConnection = await setupDBConnection();
  await setupDBModels(dbConnection);
  const port = nconf.get(Config.SITE_SERVER_PORT);
  const jsonParser = bodyParser.json();

  const server = express();

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

  server.get("/team-members", async (req, res) => {
    try {
      // const username = req.sso.user?.adUser?.userPrincipalName;
      const team = await getTeamMembers("anna.kozlova@forsta.com");
      res.send({
        team,
        currentUser: { id: "D1E5D597-93FC-4AEA-8FFF-D92CADD0F639", name: "Anna Kozlova" },
      });
    } catch (e) {
      res.status(500).send({ error: "Something went wrong, please try again later" });
    }
  });

  server.get("/vacations", async (req, res) => {
    try {
      const usersIds = req.query.id as string[];

      const usersVacations = await getTeamVacations({ usersIds, dbConnection });
      res.send({ vacations: usersVacations });
    } catch (e) {
      res.status(500).send({ error: "Something went wrong, please try again later" });
    }
  });

  server.post("/vacations", jsonParser, async (req, res) => {
    try {
      //userId: (req.sso.user?.adUser?.objectGUID as string[])[0] ||| userName: req.sso.user?.displayName as string
      const vacation = await createVacation({
        userId: "D1E5D597-93FC-4AEA-8FFF-D92CADD0F639",
        dbConnection,
        userName: "Anna Kozlova",
        vacationStartDate: req.body.vacationStartDate,
        vacationEndDate: req.body.vacationEndDate,
      });
      res.status(200).send(vacation);
    } catch (e) {
      res.status(500).send({ error: "Something went wrong, please try again later" });
    }
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
})();
