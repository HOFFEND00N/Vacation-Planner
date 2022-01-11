import path from "path";
import express from "express";
import nconf from "nconf";
import { sso } from "node-expose-sspi";
import ActiveDirectory from "activedirectory";
import { Op } from "sequelize";
import { Config, ModelsNames, TEAMS } from "../constants";
import { makeIndexHtml } from "./makeIndexHtml";
import { setupConfig } from "./setupConfig";
import { setupDBConnection } from "./DBHelpers/setupDBConnection";
import { setupDBModels } from "./DBHelpers/setupDBModels";
import { findUserTeam } from "./ADHelpers/findUserTeam";
import { findGroupMembers } from "./ADHelpers/findGroupMembers";
import { entryParser } from "./ADHelpers/entryParser";

(async () => {
  setupConfig();
  const dbConnection = await setupDBConnection();
  await setupDBModels(dbConnection);
  const port = nconf.get(Config.SITE_SERVER_PORT);

  const server = express();

  server.use(sso.auth());
  if (process.env.mode === "production") {
    server.use(express.static("dist"));
  }

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
      password: Buffer.from(process.env.password!, "base64").toString("ascii"),
      entryParser,
    });
    //TODO: extract logic from controller\ api point
    try {
      const userTeam = await findUserTeam({ teams: TEAMS, username, activeDirectory });
      const teamMembers = await findGroupMembers({ groupName: userTeam, activeDirectory });
      const filteredTeamMembers = teamMembers
        .filter((teamMember) => teamMember.dn.includes("OU=Yaroslavl"))
        .map((teamMember) => ({ name: teamMember.displayName, id: teamMember.objectGUID }));

      res.send({
        team: filteredTeamMembers,
        currentUser: { id: "D1E5D597-93FC-4AEA-8FFF-D92CADD0F639", name: "Anna Kozlova" },
      });
    } catch (e) {
      res.status(500).send({ error: "Something went wrong, please try again later" });
    }
  });
  server.get("/vacations", async (req, res) => {
    try {
      const usersIds = req.query.id as string[];

      const usersVacations = await dbConnection.models[ModelsNames.VACATION].findAll({
        where: { userId: { [Op.or]: usersIds } },
      });

      res.send({ vacations: usersVacations });
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
  //TODO: study rest API
})();
