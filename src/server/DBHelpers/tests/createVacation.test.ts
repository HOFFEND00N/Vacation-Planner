import { Sequelize } from "sequelize";
import { createVacation } from "../createVacation";

describe("Create vacation", () => {
  test("should create vacation, when user exists in DB", async () => {
    const userCreateMock = jest.fn();
    const vacationCreateMock = jest.fn();
    const mockedDbConnection = {
      models: {
        User: {
          findOne: () => true,
          create: userCreateMock,
        },
        Vacation: {
          create: vacationCreateMock,
        },
      },
    };

    await createVacation({
      vacationStartDate: new Date("1-1-2021"),
      vacationEndDate: new Date("1-11-2021"),
      userName: "Alex Smith",
      userId: "user id",
      dbConnection: mockedDbConnection as unknown as Sequelize,
    });

    expect(userCreateMock).toBeCalledTimes(0);
    expect(vacationCreateMock).toBeCalledTimes(1);
  });

  test("should create vacation and user, when user dont exists in DB", async () => {
    const userCreateMock = jest.fn();
    const vacationCreateMock = jest.fn();
    const mockedDbConnection = {
      models: {
        User: {
          findOne: () => false,
          create: userCreateMock,
        },
        Vacation: {
          create: vacationCreateMock,
        },
      },
    };

    await createVacation({
      vacationStartDate: new Date("1-1-2021"),
      vacationEndDate: new Date("1-11-2021"),
      userName: "{Alex Smith}",
      userId: "user id",
      dbConnection: mockedDbConnection as unknown as Sequelize,
    });

    expect(userCreateMock).toBeCalledTimes(1);
    expect(vacationCreateMock).toBeCalledTimes(1);
  });
});
