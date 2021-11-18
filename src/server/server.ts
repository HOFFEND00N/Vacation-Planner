import path from "path";
import express from "express";
import nconf from "nconf";
import { sso } from "node-expose-sspi";
import ActiveDirectory from "activedirectory";
import { CONFIG, MODELS_NAMES, TEAMS } from "../constants";
import { IActiveDirectory, ITeamMember } from "../types";
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

  function customEntryParser(entry, raw, callback) {
    entry.objectGUID = convertObjectGUIDToUUID(raw.objectGUID);
    callback(entry);
  }

  const convertObjectGUIDToUUID = (objectGUID) => {
    const hexValue = Buffer.from(objectGUID, "binary").toString("hex");

    return hexValue
      .replace(
        //   (   $1:A4   )(   $2:A3   )(   $3:A2   )(   $4:A1   )(   $5:B2   )(   $6:B1   )(   $7:C2   )(   $8:C1   )(   $9:D    )(   $10:F    )
        /([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{4})([0-9a-f]{10})/,
        "$4$3$2$1-$6$5-$8$7-$9-$10"
      )
      .toLocaleUpperCase();
  };

  const findADUser = (activeDirectory: IActiveDirectory, username: string): Promise<ITeamMember> =>
    new Promise((resolve, reject) => {
      activeDirectory.findUser(
        {
          attributes: [],
          entryParser: customEntryParser,
        },
        username,
        function (err, user) {
          if (err) {
            reject(err);
          }

          if (!user) reject("User: " + username + " not found.");
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

    const user = await findADUser(activeDirectory, "Ivan.Petrov");

    // await dbConnection.models[MODELS_NAMES.USER].create({ firstName: "Ivan", lastName: "Petrov", id: user.objectGUID });
    const vacation = await dbConnection.models[MODELS_NAMES.VACATION].findAll({ where: { userId: user.objectGUID } });
    res.send(vacation);
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
