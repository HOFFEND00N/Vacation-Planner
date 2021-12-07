import moment from "moment";
import { VacationInterval } from "../../../types";
import { VacationType } from "../vacation";
import { getVacationIntervalForCurrentMonth } from "../getVacationIntervalForCurrentMonth";

describe("get vacation interval for current month", () => {
  test("pass one day vacation, expect to return interval with one day difference", () => {
    const expectedIntervalForCurrentMonth: VacationInterval = { start: 1, end: 2 };

    const actualIntervalForCurrentMonth = getVacationIntervalForCurrentMonth({
      vacation: {
        start: new Date("1-1-2021"),
        end: new Date("1-2-2021"),
        userId: "2",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
      today: moment(new Date("1-1-2021")),
    });

    expect(actualIntervalForCurrentMonth).toEqual(expectedIntervalForCurrentMonth);
  });

  test("pass vacation in one month, expect to return from vacation start to vacation end", () => {
    const expectedIntervalForCurrentMonth: VacationInterval = { start: 1, end: 13 };

    const actualIntervalForCurrentMonth = getVacationIntervalForCurrentMonth({
      vacation: {
        start: new Date("1-1-2021"),
        end: new Date("1-13-2021"),
        userId: "2",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
      today: moment(new Date("1-11-2021")),
    });

    expect(actualIntervalForCurrentMonth).toEqual(expectedIntervalForCurrentMonth);
  });

  test("pass vacation with start before current month, vacation end after current month, expect to return whole month interval", () => {
    const expectedIntervalForCurrentMonth: VacationInterval = { start: 1, end: 28 };

    const actualIntervalForCurrentMonth = getVacationIntervalForCurrentMonth({
      vacation: {
        start: new Date("1-28-2021"),
        end: new Date("3-1-2021"),
        userId: "2",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
      today: moment(new Date("2-11-2021")),
    });

    expect(actualIntervalForCurrentMonth).toEqual(expectedIntervalForCurrentMonth);
  });

  test("pass vacation with start before current month, vacation end in current month, expect to return from month begin to vacation end", () => {
    const expectedIntervalForCurrentMonth: VacationInterval = { start: 1, end: 14 };

    const actualIntervalForCurrentMonth = getVacationIntervalForCurrentMonth({
      vacation: {
        start: new Date("1-20-2021"),
        end: new Date("2-14-2021"),
        userId: "2",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
      today: moment(new Date("2-11-2021")),
    });

    expect(actualIntervalForCurrentMonth).toEqual(expectedIntervalForCurrentMonth);
  });

  test("pass vacation with vacation in current month, vacation end in next month, expect to return from vacation begin to month end", () => {
    const expectedIntervalForCurrentMonth: VacationInterval = { start: 20, end: 28 };

    const actualIntervalForCurrentMonth = getVacationIntervalForCurrentMonth({
      vacation: {
        start: new Date("2-20-2021"),
        end: new Date("3-14-2021"),
        userId: "2",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
      today: moment(new Date("2-11-2021")),
    });

    expect(actualIntervalForCurrentMonth).toEqual(expectedIntervalForCurrentMonth);
  });

  test("pass vacation with dates for previous year, expect to return default interval", () => {
    const expectedIntervalForCurrentMonth: VacationInterval = { start: -1, end: -1 };

    const actualIntervalForCurrentMonth = getVacationIntervalForCurrentMonth({
      vacation: {
        start: new Date("2-20-2020"),
        end: new Date("3-14-2020"),
        userId: "2",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
      today: moment(new Date("2-11-2021")),
    });

    expect(actualIntervalForCurrentMonth).toEqual(expectedIntervalForCurrentMonth);
  });

  test("pass vacation with dates for current year but previous month, expect to return default interval", () => {
    const expectedIntervalForCurrentMonth: VacationInterval = { start: -1, end: -1 };

    const actualIntervalForCurrentMonth = getVacationIntervalForCurrentMonth({
      vacation: {
        start: new Date("2-20-2021"),
        end: new Date("2-26-2021"),
        userId: "2",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
      today: moment(new Date("5-11-2021")),
    });

    expect(actualIntervalForCurrentMonth).toEqual(expectedIntervalForCurrentMonth);
  });

  test("pass vacation with dates for current year but next month, expect to return default interval", () => {
    const expectedIntervalForCurrentMonth: VacationInterval = { start: -1, end: -1 };

    const actualIntervalForCurrentMonth = getVacationIntervalForCurrentMonth({
      vacation: {
        start: new Date("7-20-2021"),
        end: new Date("8-26-2021"),
        userId: "2",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
      today: moment(new Date("5-11-2021")),
    });

    expect(actualIntervalForCurrentMonth).toEqual(expectedIntervalForCurrentMonth);
  });
});
