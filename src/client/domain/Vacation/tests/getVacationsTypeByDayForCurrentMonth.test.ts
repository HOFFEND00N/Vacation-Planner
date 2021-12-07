import moment from "moment";
import { VacationTypeByDay } from "../../../types";
import { VacationType } from "../vacation";
import { getVacationsTypeByDayForCurrentMonth } from "../getVacationsTypeByDayForCurrentMonth";

describe("get vacations type by day for current month", () => {
  test("pass no vacations, expect to return empty object", () => {
    const expectedVacationsTypeByDayForCurrentMonth: VacationTypeByDay = {};

    const actualVacationsTypeByDayForCurrentMonth = getVacationsTypeByDayForCurrentMonth({
      vacations: [],
      today: moment(new Date("1-11-2021")),
    });

    expect(actualVacationsTypeByDayForCurrentMonth).toEqual(expectedVacationsTypeByDayForCurrentMonth);
  });

  test("pass one approved vacation, expect to return correct object", () => {
    const expectedVacationsTypeByDayForCurrentMonth: VacationTypeByDay = {
      20: VacationType.APPROVED,
      21: VacationType.APPROVED,
      22: VacationType.APPROVED,
      23: VacationType.APPROVED,
      24: VacationType.APPROVED,
      25: VacationType.APPROVED,
      26: VacationType.APPROVED,
    };

    const actualVacationsTypeByDayForCurrentMonth = getVacationsTypeByDayForCurrentMonth({
      vacations: [
        {
          start: new Date("2-20-2021"),
          end: new Date("2-26-2021"),
          userId: "2",
          type: VacationType.APPROVED,
          id: "vacation 1",
        },
      ],
      today: moment(new Date("2-11-2021")),
    });

    expect(actualVacationsTypeByDayForCurrentMonth).toEqual(expectedVacationsTypeByDayForCurrentMonth);
  });

  test("pass one approved vacation and one pending for approval, expect to return correct object", () => {
    const expectedVacationsTypeByDayForCurrentMonth: VacationTypeByDay = {
      1: VacationType.PENDING_APPROVAL,
      2: VacationType.PENDING_APPROVAL,
      3: VacationType.PENDING_APPROVAL,
      4: VacationType.PENDING_APPROVAL,
      5: VacationType.PENDING_APPROVAL,
      6: VacationType.PENDING_APPROVAL,
      7: VacationType.PENDING_APPROVAL,
      20: VacationType.APPROVED,
      21: VacationType.APPROVED,
      22: VacationType.APPROVED,
      23: VacationType.APPROVED,
      24: VacationType.APPROVED,
      25: VacationType.APPROVED,
      26: VacationType.APPROVED,
    };

    const actualVacationsTypeByDayForCurrentMonth = getVacationsTypeByDayForCurrentMonth({
      vacations: [
        {
          start: new Date("2-1-2021"),
          end: new Date("2-7-2021"),
          userId: "2",
          type: VacationType.PENDING_APPROVAL,
          id: "vacation 2",
        },
        {
          start: new Date("2-20-2021"),
          end: new Date("2-26-2021"),
          userId: "2",
          type: VacationType.APPROVED,
          id: "vacation 1",
        },
      ],
      today: moment(new Date("2-11-2021")),
    });

    expect(actualVacationsTypeByDayForCurrentMonth).toEqual(expectedVacationsTypeByDayForCurrentMonth);
  });
});
