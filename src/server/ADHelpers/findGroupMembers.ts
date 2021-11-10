import { IActiveDirectory } from "../../types/IActiveDirectory";
import { IUser } from "../../types/teamMember";

export async function findGroupMembers({
  groupName,
  activeDirectory,
}: {
  groupName: string;
  activeDirectory: IActiveDirectory;
}): Promise<IUser[]> {
  return new Promise((resolve, reject) => {
    activeDirectory.getUsersForGroup(groupName, function (error, users) {
      if (error) {
        reject(error);
      }

      if (!users) {
        console.log("Group: " + groupName + " not found.");
      } else {
        resolve(users);
      }
    });
  });
}
