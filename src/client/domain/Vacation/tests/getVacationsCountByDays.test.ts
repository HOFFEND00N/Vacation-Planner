import moment from "moment";
import { getVacationsCountByDays } from "../getVacationsCountByDays";
import { VacationCountByDays } from "../../types";
import { VacationType } from "../../../../sharedKernel";

describe("get vacations count by days", () => {
  test("should return empty object, when zero vacation passed", () => {
    const expectedVacationsCountByDays: VacationCountByDays = {};

    const actualVacationsCountByDays = getVacationsCountByDays({
      vacations: [],
      currentTableCalendarDate: moment(new Date("1-11-2021")),
    });

    expect(actualVacationsCountByDays).toEqual(expectedVacationsCountByDays);
  });

  test("should return 1 for all days, when one vacation passed", () => {
    const expectedVacationsCountByDays: VacationCountByDays = { 1: 1, 2: 1 };

    const actualVacationsCountByDays = getVacationsCountByDays({
      vacations: [
        {
          start: new Date("1-1-2021"),
          end: new Date("1-2-2021"),
          userId: "2",
          type: VacationType.APPROVED,
          id: "vacation 1",
        },
      ],
      currentTableCalendarDate: moment(new Date("1-1-2021")),
    });

    expect(actualVacationsCountByDays).toEqual(expectedVacationsCountByDays);
  });

  test("should return 1 for first 2 days and return 2 for second 2 days, when two vacations passed", () => {
    const expectedVacationsCountByDays: VacationCountByDays = { 1: 2, 2: 2, 3: 1, 4: 1 };

    const actualVacationsCountByDays = getVacationsCountByDays({
      vacations: [
        {
          start: new Date("1-1-2021"),
          end: new Date("1-2-2021"),
          userId: "2",
          type: VacationType.APPROVED,
          id: "vacation 1",
        },
        {
          start: new Date("1-1-2021"),
          end: new Date("1-4-2021"),
          userId: "2",
          type: VacationType.APPROVED,
          id: "vacation 1",
        },
      ],
      currentTableCalendarDate: moment(new Date("1-1-2021")),
    });

    expect(actualVacationsCountByDays).toEqual(expectedVacationsCountByDays);
  });
});
