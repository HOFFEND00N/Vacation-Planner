import { VacationType } from "../vacation";
import { getTotalVacationsDays } from "./getTotalVacationDays";

describe("get total vacations days", () => {
  test("no vacations passed, expect to return 0", () => {
    const expectedTotalVacationDays = 0;

    const actualTotalVacationDays = getTotalVacationsDays([]);

    expect(actualTotalVacationDays).toEqual(expectedTotalVacationDays);
  });

  test("one vacation passed, expect to return 12", () => {
    const expectedTotalVacationDays = 12;

    const actualTotalVacationDays = getTotalVacationsDays([
      {
        start: new Date("1-1-2021"),
        end: new Date("1-12-2021"),
        userId: "2",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
    ]);

    expect(actualTotalVacationDays).toEqual(expectedTotalVacationDays);
  });

  test("two vacation passed, expect to return 21", () => {
    const expectedTotalVacationDays = 21;

    const actualTotalVacationDays = getTotalVacationsDays([
      {
        start: new Date("1-1-2021"),
        end: new Date("1-13-2021"),
        userId: "2",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
      {
        start: new Date("1-21-2021"),
        end: new Date("1-28-2021"),
        userId: "2",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
    ]);

    expect(actualTotalVacationDays).toEqual(expectedTotalVacationDays);
  });
});
