import { VacationTypeByDay } from "../../../../../../types";
import { makeStylesForUserDataRowElement } from "../makeStylesForUserDataRowElement";
import { VacationType } from "../../../../../../domain/Vacation/vacation";

describe("make styles for table body calendar element", () => {
  test("should have default class name, if second column cell without vacations passed", () => {
    const expectedClassNames = "row__cell";
    const vacationStart = { date: new Date(0), isSelected: false };
    const vacationEnd = { date: new Date(0), isSelected: false };
    const vacationTypeByDay: VacationTypeByDay = {};
    const columnNumber = 1;
    const elementDate = new Date("1-1-2021");
    const userId = "1";
    const currentUserId = "2";

    const actualClassNames = makeStylesForUserDataRowElement({
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

  test("should have default and first column class names, if first column cell without vacations passed", () => {
    const expectedClassNames = "row__cell row__first-column-cell";
    const vacationStart = { date: new Date(0), isSelected: false };
    const vacationEnd = { date: new Date(0), isSelected: false };
    const vacationTypeByDay: VacationTypeByDay = {};
    const columnNumber = 0;
    const elementDate = new Date("1-1-2021");
    const userId = "1";
    const currentUserId = "2";

    const actualClassNames = makeStylesForUserDataRowElement({
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

  test("should have default and vacation approved class names, if second column cell with vacation approved", () => {
    const expectedClassNames = "row__cell row__cell--vacation-approved";
    const vacationStart = { date: new Date(0), isSelected: false };
    const vacationEnd = { date: new Date(0), isSelected: false };
    const vacationTypeByDay: VacationTypeByDay = { 1: VacationType.APPROVED };
    const columnNumber = 1;
    const elementDate = new Date("1-1-2021");
    const userId = "1";
    const currentUserId = "2";

    const actualClassNames = makeStylesForUserDataRowElement({
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

  test("should have default and vacation pending approval class names, if second column cell with vacation pending approval", () => {
    const expectedClassNames = "row__cell row__cell--vacation-pending-approval";
    const vacationStart = { date: new Date(0), isSelected: false };
    const vacationEnd = { date: new Date(0), isSelected: false };
    const vacationTypeByDay: VacationTypeByDay = { 1: VacationType.PENDING_APPROVAL };
    const columnNumber = 1;
    const elementDate = new Date("1-1-2021");
    const userId = "1";
    const currentUserId = "2";

    const actualClassNames = makeStylesForUserDataRowElement({
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

  test("should have default and selectable class names, if second column in current user row, with no vacation", () => {
    const expectedClassNames = "row__cell row__cell--selectable";
    const vacationStart = { date: new Date(0), isSelected: false };
    const vacationEnd = { date: new Date(0), isSelected: false };
    const vacationTypeByDay: VacationTypeByDay = {};
    const columnNumber = 1;
    const elementDate = new Date("1-1-2021");
    const userId = "1";
    const currentUserId = "1";

    const actualClassNames = makeStylesForUserDataRowElement({
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

  test("should have default, selectable, and selected class names, if second column cell with vacation selected", () => {
    const expectedClassNames = "row__cell row__cell--selectable row__cell--selected";
    const vacationStart = { date: new Date("1-1-2021"), isSelected: true };
    const vacationEnd = { date: new Date("11-1-2021"), isSelected: true };
    const vacationTypeByDay: VacationTypeByDay = {};
    const columnNumber = 1;
    const elementDate = new Date("1-1-2021");
    const userId = "1";
    const currentUserId = "1";

    const actualClassNames = makeStylesForUserDataRowElement({
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
