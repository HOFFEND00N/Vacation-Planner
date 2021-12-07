import { IActiveDirectory } from "../types";

export function findUsers(LDAPQuery: string, activeDirectory: IActiveDirectory) {
  return new Promise((resolve, reject) => {
    activeDirectory.findUsers(LDAPQuery, (error, users) => {
      if (error) {
        reject(error);
      }
      if (!users || users.length == 0) {
        reject("No users found.");
      }
      resolve(users);
    });
  });
}
