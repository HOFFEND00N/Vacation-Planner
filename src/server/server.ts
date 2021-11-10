import path from "path";
import express from "express";
import nconf from "nconf";
import { sso } from "node-expose-sspi";
import ActiveDirectory from "activedirectory";
import { CONFIG, MODELS_NAMES, TEAMS } from "../constants";
import { makeIndexHtml } from "./makeIndexHtml";
import { setupConfig } from "./setupConfig";
import { setupDBConnection } from "./DBHelpers/setupDBConnection";
import { setupDBModels } from "./DBHelpers/setupDBModels";
import { findUserTeam } from "./ADHelpers/findUserTeam";
import { findGroupMembers } from "./ADHelpers/findGroupMembers";

(async () => {
  setupConfig();
  const dbConnection = await setupDBConnection();
  setupDBModels(dbConnection);
  const port = nconf.get(CONFIG.SITE_SERVER_PORT);

  const server = express();

  server.use(sso.auth());
  if (process.env.mode === "production") {
    server.use(express.static("dist"));
  }

  server.get("/user", async (req, res) => {
    const currentUser = await dbConnection.models[MODELS_NAMES.USER].findAll();
    res.send({ user: currentUser[0] });
  });

  server.post("/plan-vacation", (req, res) => {
    res.set("Content-Type", "application/json");
    res.send({ message: "saved to db" });
  });

  server.get("*", async (req, res) => {
    // const username = req.sso.user?.adUser?.userPrincipalName;
    const username = "anna.kozlova@forsta.com";

    const activeDirectory = new ActiveDirectory({
      url: "ldap://firmglobal.com",
      baseDN: "dc=firmglobal,dc=com",
      username: `${process.env.login}@forsta.com`,
      password: process.env.password,
    });

    try {
      const userTeam = await findUserTeam({ teams: TEAMS, username, activeDirectory });
      console.log(userTeam);
      const teamMembers = await findGroupMembers({ groupName: userTeam, activeDirectory });
      console.log(
        teamMembers
          .filter((teamMember) => teamMember.dn.includes("OU=Yaroslavl"))
          .map((teamMember) => teamMember.displayName)
      );
    } catch (e) {
      console.log(e);
    }

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
