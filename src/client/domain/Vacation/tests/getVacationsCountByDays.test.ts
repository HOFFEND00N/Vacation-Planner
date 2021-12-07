import moment from "moment";
import { VacationCountByDays, VacationType } from "../vacation";
import { getVacationsCountByDays } from "../getVacationsCountByDays";

describe("get vacations count by days", () => {
  test("pass zero vacation expect to return empty object", () => {
    const expectedVacationsCountByDays: VacationCountByDays = {};

    const actualVacationsCountByDays = getVacationsCountByDays({ vacations: [], today: moment(new Date("1-11-2021")) });

    expect(actualVacationsCountByDays).toEqual(expectedVacationsCountByDays);
  });

  test("pass one vacation expect to return correct object", () => {
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
      today: moment(new Date("1-1-2021")),
    });

    expect(actualVacationsCountByDays).toEqual(expectedVacationsCountByDays);
  });

  test("pass two vacations expect to return correct object", () => {
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
      today: moment(new Date("1-1-2021")),
    });

    expect(actualVacationsCountByDays).toEqual(expectedVacationsCountByDays);
  });
});
