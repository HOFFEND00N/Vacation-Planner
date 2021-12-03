import { VacationTypeByDay } from "../../../../../../../types";
import { makeStylesForTableCalendarBodyElement } from "../makeStylesForTableCalendarBodyElement";
import { VacationType } from "../../../../../../../domain/vacation";

describe("make styles for table body calendar element", () => {
  test("in second column with no vacations has one class name", () => {
    const expectedClassNames = "row__cell";
    const vacationStart = { date: new Date(0), isSelected: false };
    const vacationEnd = { date: new Date(0), isSelected: false };
    const vacationTypeByDay: VacationTypeByDay = {};
    const columnNumber = 1;
    const elementDate = new Date("1-1-2021");
    const userId = "1";
    const currentUserId = "2";

    const actualClassNames = makeStylesForTableCalendarBodyElement({
      vacationStart,
      vacationEnd,
      vacationTypeByDay,
      columnNumber,
      elementDate,
      userId,
      currentUserId,
    });

    expect(actualClassNames).toEqual(expectedClassNames);
  });

  test("in first column with no vacations has two class names", () => {
    const expectedClassNames = "row__cell row__first-column-cell";
    const vacationStart = { date: new Date(0), isSelected: false };
    const vacationEnd = { date: new Date(0), isSelected: false };
    const vacationTypeByDay: VacationTypeByDay = {};
    const columnNumber = 0;
    const elementDate = new Date("1-1-2021");
    const userId = "1";
    const currentUserId = "2";

    const actualClassNames = makeStylesForTableCalendarBodyElement({
      vacationStart,
      vacationEnd,
      vacationTypeByDay,
      columnNumber,
      elementDate,
      userId,
      currentUserId,
    });

    expect(actualClassNames).toEqual(expectedClassNames);
  });

  test("in second column with vacation approved has two class names", () => {
    const expectedClassNames = "row__cell row__cell__vacation-approved";
    const vacationStart = { date: new Date(0), isSelected: false };
    const vacationEnd = { date: new Date(0), isSelected: false };
    const vacationTypeByDay: VacationTypeByDay = { 1: VacationType.APPROVED };
    const columnNumber = 1;
    const elementDate = new Date("1-1-2021");
    const userId = "1";
    const currentUserId = "2";

    const actualClassNames = makeStylesForTableCalendarBodyElement({
      vacationStart,
      vacationEnd,
      vacationTypeByDay,
      columnNumber,
      elementDate,
      userId,
      currentUserId,
    });

    expect(actualClassNames).toEqual(expectedClassNames);
  });

  test("in second column with vacation pending approval has two class names", () => {
    const expectedClassNames = "row__cell row__cell__vacation-pending-approval";
    const vacationStart = { date: new Date(0), isSelected: false };
    const vacationEnd = { date: new Date(0), isSelected: false };
    const vacationTypeByDay: VacationTypeByDay = { 1: VacationType.PENDING_APPROVAL };
    const columnNumber = 1;
    const elementDate = new Date("1-1-2021");
    const userId = "1";
    const currentUserId = "2";

    const actualClassNames = makeStylesForTableCalendarBodyElement({
      vacationStart,
      vacationEnd,
      vacationTypeByDay,
      columnNumber,
      elementDate,
      userId,
      currentUserId,
    });

    expect(actualClassNames).toEqual(expectedClassNames);
  });

  test("in second column in current user row, with no vacation has two class names", () => {
    const expectedClassNames = "row__cell row__cell__selectable";
    const vacationStart = { date: new Date(0), isSelected: false };
    const vacationEnd = { date: new Date(0), isSelected: false };
    const vacationTypeByDay: VacationTypeByDay = {};
    const columnNumber = 1;
    const elementDate = new Date("1-1-2021");
    const userId = "1";
    const currentUserId = "1";

    const actualClassNames = makeStylesForTableCalendarBodyElement({
      vacationStart,
      vacationEnd,
      vacationTypeByDay,
      columnNumber,
      elementDate,
      userId,
      currentUserId,
    });

    expect(actualClassNames).toEqual(expectedClassNames);
  });

  test("in second column with vacation selected has three class names", () => {
    const expectedClassNames = "row__cell row__cell__selectable row__cell__selected";
    const vacationStart = { date: new Date("1-1-2021"), isSelected: true };
    const vacationEnd = { date: new Date("11-1-2021"), isSelected: true };
    const vacationTypeByDay: VacationTypeByDay = {};
    const columnNumber = 1;
    const elementDate = new Date("1-1-2021");
    const userId = "1";
    const currentUserId = "1";

    const actualClassNames = makeStylesForTableCalendarBodyElement({
      vacationStart,
      vacationEnd,
      vacationTypeByDay,
      columnNumber,
      elementDate,
      userId,
      currentUserId,
    });

    expect(actualClassNames).toEqual(expectedClassNames);
  });
});
