import supertest from "supertest";
import express from "express";
import { teamMembersRouter } from "../teamMembersRouter";
import { getTeamMembers } from "../../ADHelpers/getTeamMembers";

jest.mock("../../ADHelpers/getTeamMembers");

describe("teamMembersRouters", () => {
  let request;
  beforeEach(() => {
    const app = express();
    app.use("/team-members", teamMembersRouter);
    request = supertest(app);
  });
  test("should return team members, when AD interaction successfully", async () => {
    (getTeamMembers as jest.Mock).mockReturnValue([{ name: "name", id: "id" }]);

    const response = await request.get("/team-members");

    expect(response.status).toBe(200);
    expect(response.body.team).toEqual([{ name: "name", id: "id" }]);
  });

  test("should return error, when AD interaction fails", async () => {
    (getTeamMembers as jest.Mock).mockImplementation(() => {
      throw Error("some error");
    });

    const response = await request.get("/team-members");

    expect(response.status).toBe(500);
    expect(response.body.error).toEqual("Something went wrong, please try again later");
  });
});
