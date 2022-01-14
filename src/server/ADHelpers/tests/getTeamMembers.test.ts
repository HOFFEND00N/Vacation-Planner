import { findUserTeam } from "../findUserTeam";
import { findGroupMembers } from "../findGroupMembers";
import { getTeamMembers } from "../getTeamMembers";

jest.mock("../findUserTeam");
jest.mock("../findGroupMembers");

describe("get team members", () => {
  test("should return 2 team members, when 1 not from Yaroslavl", async () => {
    (findUserTeam as jest.Mock).mockReturnValue("team 1");
    (findGroupMembers as jest.Mock).mockReturnValue([
      {
        displayName: "Employee 1",
        objectGUID: "id 1",
        dn: "OU=Yaroslavl",
      },
      {
        displayName: "Employee 2",
        objectGUID: "id 2",
        dn: "OU=Yaroslavl",
      },
      {
        displayName: "Employee 3",
        objectGUID: "id 3",
        dn: "OU=Oslo",
      },
    ]);

    const expectedTeamMembers = [
      {
        name: "Employee 1",
        id: "id 1",
      },
      {
        name: "Employee 2",
        id: "id 2",
      },
    ];

    const actualTeamMembers = await getTeamMembers("Employee 1");

    expect(actualTeamMembers).toEqual(expectedTeamMembers);
  });
});
