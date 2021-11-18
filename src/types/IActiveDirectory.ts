import { ITeamMember } from "./ITeamMember";

export interface IActiveDirectory {
  isUserMemberOf: (username: string, groupName: string, callback: (error: Error, isMember: boolean) => void) => void;
  getUsersForGroup: (groupName: string, callback: (error: Error, users: ITeamMember[]) => void) => void;
  findUser: (
    options: { attributes: string[]; entryParser: (entry, raw, callback) => void },
    username: string,
    callback: (error: Error, user: ITeamMember) => void
  ) => void;
}
