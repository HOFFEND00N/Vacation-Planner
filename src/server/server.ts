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
  await setupDBModels(dbConnection);
  const port = nconf.get(CONFIG.SITE_SERVER_PORT);

  const server = express();

  server.use(sso.auth());
  // server.use((req, res) => {
  //   res.send(req.sso);
  // })
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

  server.get("/team-members", async (req, res) => {
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
      const teamMembers = await findGroupMembers({ groupName: userTeam, activeDirectory });
      const filteredTeamMembers = teamMembers
        .filter((teamMember) => teamMember.dn.includes("OU=Yaroslavl"))
        .map((teamMember) => ({ name: teamMember.displayName, id: teamMember.objectGUID }));

      res.send({ team: filteredTeamMembers });
    } catch (e) {
      console.log(e);
    }
  });

  const test = (activeDirectory) =>
    new Promise((resolve, reject) => {
      activeDirectory.findUser(
        {
          attributes: [],
        },
        "Ivan.Petrov",
        function (err, user) {
          if (err) {
            reject(err);
          }

          if (!user) reject("User: " + "Ivan.Petrov" + " not found.");
          else {
            resolve(user);
          }
        }
      );
    });

  server.get("/test", async (req, res) => {
    const activeDirectory = new ActiveDirectory({
      url: "ldap://firmglobal.com",
      baseDN: "dc=firmglobal,dc=com",
      username: `${process.env.login}@forsta.com`,
      password: process.env.password,
    });

    res.send(await test(activeDirectory));
  });

  server.get("/vacations", async (req, res) => {
    const usersIds = req.query.id as string[];

    const usersVacations = await dbConnection.models[MODELS_NAMES.VACATION].findAll({ where: { userId: usersIds } });

    res.send({ vacations: usersVacations });
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
