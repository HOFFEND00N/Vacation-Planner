export interface IActiveDirectory {
  isUserMemberOf: (username: string, groupName: string, callback: (error: Error, isMember: boolean) => void) => void;
}
