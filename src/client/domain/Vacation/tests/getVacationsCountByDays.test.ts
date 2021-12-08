import moment from "moment";
import { VacationCountByDays, VacationType } from "../vacation";
import { getVacationsCountByDays } from "../getVacationsCountByDays";

describe("get vacations count by days", () => {
  test("should return empty object, when zero vacation passed", () => {
    const expectedVacationsCountByDays: VacationCountByDays = {};

    const actualVacationsCountByDays = getVacationsCountByDays({
      vacations: [],
      currentTableCalendarDate: moment(new Date("1-11-2021")),
    });

    expect(actualVacationsCountByDays).toEqual(expectedVacationsCountByDays);
  });

  test("should return correct object, when one vacation passed", () => {
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

  test("should return correct object, when two vacations passed", () => {
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
