import ActiveDirectory from "activedirectory";
import { TEAMS } from "../../constants";
import { findUserTeam } from "./findUserTeam";
import { findGroupMembers } from "./findGroupMembers";
import { entryParser } from "./entryParser";

export async function getTeamMembers(username: string) {
  const activeDirectory = new ActiveDirectory({
    url: "ldap://firmglobal.com",
    baseDN: "dc=firmglobal,dc=com",
    username: `${process.env.login}@forsta.com`,
    password: Buffer.from(process.env.password!, "base64").toString("ascii"),
    entryParser,
  });

  const userTeam = await findUserTeam({ teams: TEAMS, username, activeDirectory });
  const teamMembers = await findGroupMembers({ groupName: userTeam, activeDirectory });
  return teamMembers
    .filter((teamMember) => teamMember.dn.includes("OU=Yaroslavl"))
    .map((teamMember) => ({ name: teamMember.displayName, id: teamMember.objectGUID }));
}
