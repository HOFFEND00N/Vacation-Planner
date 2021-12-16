import { ITeamMember } from "./ITeamMember";

export interface IActiveDirectory {
  isUserMemberOf: (
    username: string,
    groupName: string,
    callback: (error: Error | null, isMember: boolean) => void
  ) => void;

  getUsersForGroup: (
    options: { attributes: string[] },
    groupName: string,
    callback: (error: Error | null, users?: ITeamMember[]) => void
  ) => void;

  findUser: (
    options: { attributes: string[] },
    username: string,
    callback: (error: Error | null, user?: ITeamMember) => void
  ) => void;
}
