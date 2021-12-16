import { findGroupMembers } from "../findGroupMembers";
import { IActiveDirectory, ITeamMember } from "../../types";

describe("find group member", () => {
  test("should return error, when connection to AD fails", async () => {
    const expectedError = new Error("something went wrong");

    const ad: IActiveDirectory = {
      getUsersForGroup: (
        options: { attributes: string[] },
        groupName: string,
        callback: (error: Error, users: ITeamMember[]) => void
      ) => {
        callback(expectedError, [{ dn: "", description: "", displayName: "", userPrincipalName: "", objectGUID: "" }]);
      },
      isUserMemberOf: jest.fn(),
    };

    await expect(
      findGroupMembers({
        groupName: "test group",
        activeDirectory: ad,
      })
    ).rejects.toEqual(expectedError);
  });

  test("should return error, when group not found", async () => {
    const groupName = "test group";
    const expectedError = new Error("Group: " + groupName + " not found.");

    const ad: IActiveDirectory = {
      getUsersForGroup: (
        options: { attributes: string[] },
        groupName: string,
        callback: (error: Error | null) => void
      ) => {
        callback(null);
      },
      isUserMemberOf: jest.fn(),
    };

    await expect(
      findGroupMembers({
        groupName,
        activeDirectory: ad,
      })
    ).rejects.toEqual(expectedError);
  });

  test("should return users", async () => {
    const groupName = "test group";
    const expectedUsers: ITeamMember[] = [
      {
        dn: "domain name 1",
        description: "description 1",
        displayName: "display name 1",
        userPrincipalName: "principal name 1",
        objectGUID: "guid 1",
      },
      {
        dn: "domain name 2",
        description: "description 2",
        displayName: "display name 2",
        userPrincipalName: "principal name 2",
        objectGUID: "guid 2",
      },
    ];

    const ad: IActiveDirectory = {
      getUsersForGroup: (
        options: { attributes: string[] },
        groupName: string,
        callback: (error: Error | null, users: ITeamMember[]) => void
      ) => {
        callback(null, [
          {
            dn: "domain name 1",
            description: "description 1",
            displayName: "display name 1",
            userPrincipalName: "principal name 1",
            objectGUID: "guid 1",
          },
          {
            dn: "domain name 2",
            description: "description 2",
            displayName: "display name 2",
            userPrincipalName: "principal name 2",
            objectGUID: "guid 2",
          },
        ]);
      },
      isUserMemberOf: jest.fn(),
    };

    await expect(
      findGroupMembers({
        groupName,
        activeDirectory: ad,
      })
    ).resolves.toEqual(expectedUsers);
  });
});
