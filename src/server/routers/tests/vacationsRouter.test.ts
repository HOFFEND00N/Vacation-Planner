import supertest from "supertest";
import express from "express";
import { getTeamVacations } from "../../DBHelpers/getTeamVacations";
import { createVacation } from "../../DBHelpers/createVacation";
import { VacationType } from "../../../shared";
import { vacationsRouter } from "../vacationsRouter";
import { deleteUnapprovedVacation } from "../../DBHelpers/deleteUnapprovedVacation";

jest.mock("../../DBHelpers/getTeamVacations");
jest.mock("../../DBHelpers/createVacation");
jest.mock("../../DBHelpers/deleteUnapprovedVacation");

describe("vacationsRouter", () => {
  let request;
  beforeEach(() => {
    const app = express();
    app.use("/vacations", vacationsRouter);
    request = supertest(app);
  });

  describe("get request", () => {
    test("should return vacations, when DB interaction successfully", async () => {
      const expectedVacations = [
        {
          id: "id",
          start: new Date("1-1-2021").toISOString(),
          end: new Date("1-11-2021").toISOString(),
          userId: "userId",
          type: VacationType.PENDING_APPROVAL,
        },
      ];
      (getTeamVacations as jest.Mock).mockReturnValue([
        {
          id: "id",
          start: new Date("1-1-2021"),
          end: new Date("1-11-2021"),
          userId: "userId",
          type: VacationType.PENDING_APPROVAL,
        },
      ]);

      const response = await request.get("/vacations");

      expect(response.status).toBe(200);
      expect(response.body.vacations).toEqual(expectedVacations);
    });

    test("should return error, when failed to retrieve vacations", async () => {
      (getTeamVacations as jest.Mock).mockImplementation(() => {
        throw Error("Something went wrong, please try again later");
      });

      const response = await request.get("/vacations");

      expect(response.status).toBe(500);
      expect(response.body.error).toEqual("Something went wrong, please try again later");
    });
  });

  describe("post request", () => {
    test("should return created vacation, when DB interaction successfully", async () => {
      const expectedVacation = {
        id: "id",
        start: new Date("1-1-2021").toISOString(),
        end: new Date("1-11-2021").toISOString(),
        userId: "userId",
        type: VacationType.PENDING_APPROVAL,
      };
      (createVacation as jest.Mock).mockImplementation(
        ({ vacationStartDate, vacationEndDate }: { vacationStartDate: Date; vacationEndDate: Date }) => {
          return {
            id: "id",
            start: vacationStartDate,
            end: vacationEndDate,
            userId: "userId",
            type: VacationType.PENDING_APPROVAL,
          };
        }
      );

      const response = await request
        .post("/vacations")
        .send({ vacationStartDate: new Date("1-1-2021"), vacationEndDate: new Date("1-11-2021") });

      expect(response.status).toBe(201);
      expect(response.body.vacation).toEqual(expectedVacation);
    });

    test("should return error, when failed to create new vacation", async () => {
      (createVacation as jest.Mock).mockImplementation(() => {
        throw Error("Something went wrong, please try again later");
      });

      const response = await request
        .post("/vacations")
        .send({ vacationStartDate: new Date("1-1-2021"), vacationEndDate: new Date("1-11-2021") });

      expect(response.status).toBe(500);
      expect(response.body.error).toEqual("Something went wrong, please try again later");
    });
  });

  describe("delete requests", () => {
    beforeEach(() => {
      (deleteUnapprovedVacation as jest.Mock).mockImplementation(({ vacationId }: { vacationId: string }) => {
        if (vacationId === "1") {
          return 1;
        }
        throw Error("no vacation with that id");
      });
    });

    test("should return created vacation, when DB interaction successfully", async () => {
      const response = await request.delete("/vacations?id=1");

      expect(response.status).toBe(204);
    });

    test("should return error, when failed to create new vacation", async () => {
      const response = await request.delete("/vacations?id=wrongId");

      expect(response.status).toBe(500);
      expect(response.body.error).toEqual("Something went wrong, please try again later");
    });
  });
});
