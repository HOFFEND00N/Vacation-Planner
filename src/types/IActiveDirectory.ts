import { ITeamMember } from "./ITeamMember";

export interface IActiveDirectory {
  isUserMemberOf: (username: string, groupName: string, callback: (error: Error, isMember: boolean) => void) => void;
  getUsersForGroup: (groupName: string, callback: (error: Error, users: ITeamMember[]) => void) => void;
}
