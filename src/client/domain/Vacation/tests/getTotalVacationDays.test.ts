import { VacationType } from "../vacation";
import { getTotalVacationsDays } from "../getTotalVacationsDays";

describe("get total vacations days", () => {
  test("should return 0, when no vacations passed", () => {
    const expectedTotalVacationDays = 0;

    const actualTotalVacationDays = getTotalVacationsDays([]);

    expect(actualTotalVacationDays).toEqual(expectedTotalVacationDays);
  });

  test("should return 12, when one vacation passed", () => {
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

  test("should return 21, when two vacations passed", () => {
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
