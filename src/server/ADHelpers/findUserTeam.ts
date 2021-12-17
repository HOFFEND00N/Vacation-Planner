import { IActiveDirectory } from "../types";

export const findUserTeam = async ({
  teams,
  username,
  activeDirectory,
}: {
  teams: string[];
  username: string;
  activeDirectory: IActiveDirectory;
}) => {
  const ADQueries: Promise<{ team: string; isMember: boolean }>[] = teams.map(
    (team) =>
      new Promise((resolve, reject) => {
        activeDirectory.isUserMemberOf(username, team, (error: Error, isMember: boolean) => {
          if (error) {
            console.log(error);
            reject(error);
          }
          resolve({ team, isMember });
        });
      })
  );
  const userTeamsMembership = await Promise.all(ADQueries);

  const userTeams = userTeamsMembership.reduce((userTeamMembership, current) => {
    if (current.isMember) {
      userTeamMembership.push(current.team);
    }
    return userTeamMembership;
  }, [] as string[]);

  if (userTeams.length > 1)
    console.log(
      `${username} is a member of several teams: ${userTeamsMembership.map((userTeamMembership) => {
        if (userTeamMembership.isMember) return userTeamMembership.team;
      })}`
    );

  return userTeams[0] ?? "";
};
