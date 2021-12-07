import { IActiveDirectory, ITeamMember } from "../types";

export function findUser(activeDirectory: IActiveDirectory, username: string): Promise<ITeamMember> {
  return new Promise((resolve, reject) => {
    activeDirectory.findUser(
      {
        attributes: [],
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
}
