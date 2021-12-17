import { IActiveDirectory, ITeamMember } from "../types";

export const findGroupMembers = async ({
  groupName,
  activeDirectory,
}: {
  groupName: string;
  activeDirectory: IActiveDirectory;
}): Promise<ITeamMember[]> => {
  return new Promise((resolve, reject) => {
    activeDirectory.getUsersForGroup({ attributes: [] }, groupName, (error, users) => {
      if (error) {
        reject(error);
      }

      if (!users) {
        reject(new Error("Group: " + groupName + " not found."));
      } else {
        resolve(users);
      }
    });
  });
};
