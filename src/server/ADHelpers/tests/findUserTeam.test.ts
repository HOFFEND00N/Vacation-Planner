import { IActiveDirectory } from "../../types";
import { findUserTeam } from "../findUserTeam";

describe("find user team", () => {
  test("should throw error, when isUserMemberOf throw error", async () => {
    const expectedError = new Error("something went wrong");

    const ad: IActiveDirectory = {
      getUsersForGroup: jest.fn(),
      isUserMemberOf: (
        username: string,
        groupName: string,
        callback: (error: Error | null, isMember: boolean) => void
      ) => {
        callback(expectedError, false);
      },
    };

    await expect(
      findUserTeam({
        teams: [""],
        activeDirectory: ad,
        username: "",
      })
    ).rejects.toEqual(expectedError);
  });

  test("should return empty string, when user is member of zero groups", async () => {
    const ad: IActiveDirectory = {
      getUsersForGroup: jest.fn(),
      isUserMemberOf: (
        username: string,
        groupName: string,
        callback: (error: Error | null, isMember: boolean) => void
      ) => {
        callback(null, false);
      },
    };

    await expect(
      findUserTeam({
        teams: [""],
        activeDirectory: ad,
        username: "",
      })
    ).resolves.toEqual("");
  });

  test("should return team, when user is member of the group", async () => {
    const ad: IActiveDirectory = {
      getUsersForGroup: jest.fn(),
      isUserMemberOf: (
        username: string,
        groupName: string,
        callback: (error: Error | null, isMember: boolean) => void
      ) => {
        callback(null, true);
      },
    };

    await expect(
      findUserTeam({
        teams: ["RD 1"],
        activeDirectory: ad,
        username: "user 1",
      })
    ).resolves.toEqual("RD 1");
  });

  test("should return first team, when user is member of several groups", async () => {
    const ad: IActiveDirectory = {
      getUsersForGroup: jest.fn(),
      isUserMemberOf: (
        username: string,
        groupName: string,
        callback: (error: Error | null, isMember: boolean) => void
      ) => {
        callback(
          null,
          (() => {
            return groupName.includes(username);
          })()
        );
      },
    };

    await expect(
      findUserTeam({
        teams: ["RD 1, user 1 is a member of this team", "RD 2, user 1 is a member of this team", "RD 3"],
        activeDirectory: ad,
        username: "user 1",
      })
    ).resolves.toEqual("RD 1, user 1 is a member of this team");
  });
});
