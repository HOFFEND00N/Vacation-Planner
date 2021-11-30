import moment from "moment";
import {
  findUserVacations,
  getDateDifferenceInDays,
  getTotalVacationsDays,
  getVacationIntervalForCurrentMonth,
  getVacationsTypeByDayForCurrentMonth,
  Vacation,
  VacationType,
} from "../vacation";
import { VacationInterval, VacationTypeByDay } from "../../types";

//case when vacation starts in one year and ends in another is impossible
describe("find user vacations", () => {
  test("nothing passed, expect to return empty array", () => {
    const expectedVacations: Vacation[] = [];

    const actualVacations = findUserVacations({ vacations: [], userId: "1", year: 1 });

    expect(actualVacations).toEqual(expectedVacations);
  });

  test("no vacations for specified user passed, expect to return empty array", () => {
    const expectedVacations: Vacation[] = [];

    const actualVacations = findUserVacations({
      vacations: [
        {
          start: new Date("1-1-2021"),
          end: new Date("1-11-2021"),
          userId: "2",
          type: VacationType.APPROVED,
          id: "vacation 1",
        },
      ],
      userId: "1",
      year: 1,
    });

    expect(actualVacations).toEqual(expectedVacations);
  });

  test("vacations for specified user passed for different year, expect to return empty array", () => {
    const expectedVacations: Vacation[] = [];

    const actualVacations = findUserVacations({
      vacations: [
        {
          start: new Date("1-1-2020"),
          end: new Date("1-11-2020"),
          userId: "1",
          type: VacationType.APPROVED,
          id: "vacation 1",
        },
      ],
      userId: "1",
      year: 2021,
    });

    expect(actualVacations).toEqual(expectedVacations);
  });

  test("vacations for specified user passed, expect to return one vacation", () => {
    const expectedVacations: Vacation[] = [
      {
        start: new Date("1-1-2021"),
        end: new Date("1-11-2021"),
        userId: "1",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
    ];

    const actualVacations = findUserVacations({
      vacations: [
        {
          start: new Date("1-1-2021"),
          end: new Date("1-11-2021"),
          userId: "1",
          type: VacationType.APPROVED,
          id: "vacation 1",
        },
      ],
      userId: "1",
      year: 2021,
    });

    expect(actualVacations).toEqual(expectedVacations);
  });

  test("vacations for specified user passed, expect to return two vacations", () => {
    const expectedVacations: Vacation[] = [
      {
        start: new Date("1-1-2021"),
        end: new Date("1-11-2021"),
        userId: "1",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
      {
        start: new Date("1-21-2021"),
        end: new Date("1-28-2021"),
        userId: "1",
        type: VacationType.APPROVED,
        id: "vacation 2",
      },
    ];

    const actualVacations = findUserVacations({
      vacations: [
        {
          start: new Date("1-1-2021"),
          end: new Date("1-11-2021"),
          userId: "1",
          type: VacationType.APPROVED,
          id: "vacation 1",
        },
        {
          start: new Date("1-21-2021"),
          end: new Date("1-28-2021"),
          userId: "1",
          type: VacationType.APPROVED,
          id: "vacation 2",
        },
      ],
      userId: "1",
      year: 2021,
    });

    expect(actualVacations).toEqual(expectedVacations);
  });
});

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

describe("get date difference in days", () => {
  test("pass the same dates, expect to return 1", () => {
    const expectedDateDifferenceInDays = 1;

    const actualDateDifferenceInDays = getDateDifferenceInDays({
      start: new Date("1-11-2021"),
      end: new Date("1-11-2021"),
    });

    expect(actualDateDifferenceInDays).toEqual(expectedDateDifferenceInDays);
  });

  test("pass different dates, expect to return 2", () => {
    const expectedDateDifferenceInDays = 2;

    const actualDateDifferenceInDays = getDateDifferenceInDays({
      start: new Date("1-11-2021"),
      end: new Date("1-12-2021"),
    });

    expect(actualDateDifferenceInDays).toEqual(expectedDateDifferenceInDays);
  });

  test("pass different dates, expect to return 33", () => {
    const expectedDateDifferenceInDays = 33;

    const actualDateDifferenceInDays = getDateDifferenceInDays({
      start: new Date("1-11-2021"),
      end: new Date("2-12-2021"),
    });

    expect(actualDateDifferenceInDays).toEqual(expectedDateDifferenceInDays);
  });
});

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
