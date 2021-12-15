import moment from "moment";
import { VacationInterval } from "../../../types";
import { getVacationIntervalForCurrentMonth } from "../getVacationIntervalForCurrentMonth";
import { VacationType } from "../../types";

describe("get vacation interval for current month", () => {
  test("should return interval with one day difference, when one day vacation passed", () => {
    const expectedIntervalForCurrentMonth: VacationInterval = { start: 1, end: 2 };

    const actualIntervalForCurrentMonth = getVacationIntervalForCurrentMonth({
      vacation: {
        start: new Date("1-1-2021"),
        end: new Date("1-2-2021"),
        userId: "2",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
      currentTableCalendarDate: moment(new Date("1-1-2021")),
    });

    expect(actualIntervalForCurrentMonth).toEqual(expectedIntervalForCurrentMonth);
  });

  test("should return interval from vacation start to vacation end, when vacations passed for one month", () => {
    const expectedIntervalForCurrentMonth: VacationInterval = { start: 1, end: 13 };

    const actualIntervalForCurrentMonth = getVacationIntervalForCurrentMonth({
      vacation: {
        start: new Date("1-1-2021"),
        end: new Date("1-13-2021"),
        userId: "2",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
      currentTableCalendarDate: moment(new Date("1-11-2021")),
    });

    expect(actualIntervalForCurrentMonth).toEqual(expectedIntervalForCurrentMonth);
  });

  test("should return whole month interval, when vacation with start before current month and vacation end after current month passed", () => {
    const expectedIntervalForCurrentMonth: VacationInterval = { start: 1, end: 28 };

    const actualIntervalForCurrentMonth = getVacationIntervalForCurrentMonth({
      vacation: {
        start: new Date("1-28-2021"),
        end: new Date("3-1-2021"),
        userId: "2",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
      currentTableCalendarDate: moment(new Date("2-11-2021")),
    });

    expect(actualIntervalForCurrentMonth).toEqual(expectedIntervalForCurrentMonth);
  });

  test("should return interval from month begin to vacation end, when vacation with start before current month, vacation end in current month passed", () => {
    const expectedIntervalForCurrentMonth: VacationInterval = { start: 1, end: 14 };

    const actualIntervalForCurrentMonth = getVacationIntervalForCurrentMonth({
      vacation: {
        start: new Date("1-20-2021"),
        end: new Date("2-14-2021"),
        userId: "2",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
      currentTableCalendarDate: moment(new Date("2-11-2021")),
    });

    expect(actualIntervalForCurrentMonth).toEqual(expectedIntervalForCurrentMonth);
  });

  test("should return interval from vacation begin to month end, vacation with vacation in current month, vacation end in next month passed", () => {
    const expectedIntervalForCurrentMonth: VacationInterval = { start: 20, end: 28 };

    const actualIntervalForCurrentMonth = getVacationIntervalForCurrentMonth({
      vacation: {
        start: new Date("2-20-2021"),
        end: new Date("3-14-2021"),
        userId: "2",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
      currentTableCalendarDate: moment(new Date("2-11-2021")),
    });

    expect(actualIntervalForCurrentMonth).toEqual(expectedIntervalForCurrentMonth);
  });

  test("should return default interval, when vacation with dates for not current year passed", () => {
    const expectedIntervalForCurrentMonth: VacationInterval = { start: -1, end: -1 };

    const actualIntervalForCurrentMonth = getVacationIntervalForCurrentMonth({
      vacation: {
        start: new Date("2-20-2020"),
        end: new Date("3-14-2020"),
        userId: "2",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
      currentTableCalendarDate: moment(new Date("2-11-2021")),
    });

    expect(actualIntervalForCurrentMonth).toEqual(expectedIntervalForCurrentMonth);
  });

  test("should return default interval, when vacation with dates for current year but previous month passed", () => {
    const expectedIntervalForCurrentMonth: VacationInterval = { start: -1, end: -1 };

    const actualIntervalForCurrentMonth = getVacationIntervalForCurrentMonth({
      vacation: {
        start: new Date("2-20-2021"),
        end: new Date("2-26-2021"),
        userId: "2",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
      currentTableCalendarDate: moment(new Date("5-11-2021")),
    });

    expect(actualIntervalForCurrentMonth).toEqual(expectedIntervalForCurrentMonth);
  });

  test("should return default interval, when vacation with dates for current year but next month passed", () => {
    const expectedIntervalForCurrentMonth: VacationInterval = { start: -1, end: -1 };

    const actualIntervalForCurrentMonth = getVacationIntervalForCurrentMonth({
      vacation: {
        start: new Date("7-20-2021"),
        end: new Date("8-26-2021"),
        userId: "2",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
      currentTableCalendarDate: moment(new Date("5-11-2021")),
    });

    expect(actualIntervalForCurrentMonth).toEqual(expectedIntervalForCurrentMonth);
  });
});
