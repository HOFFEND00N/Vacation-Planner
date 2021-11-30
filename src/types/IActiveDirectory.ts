import { ITeamMember } from "./ITeamMember";

export interface IActiveDirectory {
  isUserMemberOf: (username: string, groupName: string, callback: (error: Error, isMember: boolean) => void) => void;

  getUsersForGroup: (
    options: { attributes: string[] },
    groupName: string,
    callback: (error: Error, users: ITeamMember[]) => void
  ) => void;

  findUser: (
    options: { attributes: string[] },
    username: string,
    callback: (error: Error, user: ITeamMember) => void
  ) => void;

  findUsers: (LDAPQuery: string, callback: (error: Error, users) => void) => void;
}