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

    // activeDirectory.getGroupMembershipForUser("alexander.kosogorov@forsta.com", function (err, groups) {
    //   if (err) {
    //     console.log("ERROR: " + JSON.stringify(err));
    //     return;
    //   }
    //
    //   if (!groups) console.log("User: " + "alexander.kosogorov@forsta.com" + " not found.");
    //   else console.log(groups);
    // });

    try {
      const userTeam = await findUserTeam({ teams: TEAMS, username, activeDirectory });
      console.log(userTeam);
    } catch (e) {
      console.log(e);
    }

    // activeDirectory.getUsersForGroup(groupName, function (err, users) {
    //   if (err) {
    //     console.log("ERROR: " + JSON.stringify(err));
    //     return;
    //   }
    //
    //   if (!users) console.log("Group: " + groupName + " not found.");
    //   else {
    //     console.log(users);
    //   }
    // });

    //user login -> get groups that user belongs to -> find match between team name and a group list -> get members of the group

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
