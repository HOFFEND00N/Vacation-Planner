import { makeStylesForUserDataRowElement } from "../makeStylesForUserDataRowElement";
import { VacationType } from "../../../../../../domain/Vacation/vacation";

describe("make styles for table body calendar element", () => {
  test("should have default class name, if second column cell without vacations passed", () => {
    const expectedClassNames = "cell";
    const vacationStartDate = new Date(0);
    const vacationEndDate = new Date(0);
    const columnNumber = 1;
    const elementDate = new Date("1-1-2021");
    const userId = "1";
    const currentUserId = "2";

    const actualClassNames = makeStylesForUserDataRowElement({
      vacationStartDate,
      vacationEndDate,
      columnNumber,
      cellDate: elementDate,
      userId,
      currentUserId,
    });

    expect(actualClassNames).toEqual(expectedClassNames);
  });

  test("should have default and vacation approved class names, if second column cell with vacation approved", () => {
    const expectedClassNames = "cell cell--vacation-approved";
    const vacationStartDate = new Date(0);
    const vacationEndDate = new Date(0);
    const columnNumber = 1;
    const elementDate = new Date("1-1-2021");
    const userId = "1";
    const currentUserId = "2";

    const actualClassNames = makeStylesForUserDataRowElement({
      vacationStartDate,
      vacationEndDate,
      columnNumber,
      cellDate: elementDate,
      userId,
      currentUserId,
      vacationType: VacationType.APPROVED,
    });

    expect(actualClassNames).toEqual(expectedClassNames);
  });

  test("should have default and vacation pending approval class names, if second column cell with vacation pending approval", () => {
    const expectedClassNames = "cell cell--vacation-pending-approval";
    const vacationStartDate = new Date(0);
    const vacationEndDate = new Date(0);
    const columnNumber = 1;
    const elementDate = new Date("1-1-2021");
    const userId = "1";
    const currentUserId = "2";

    const actualClassNames = makeStylesForUserDataRowElement({
      vacationStartDate,
      vacationEndDate,
      columnNumber,
      cellDate: elementDate,
      userId,
      currentUserId,
      vacationType: VacationType.PENDING_APPROVAL,
    });

    expect(actualClassNames).toEqual(expectedClassNames);
  });

  test("should have default and selectable class names, if second column in current user row, with no vacation", () => {
    const expectedClassNames = "cell cell--selectable";
    const vacationStartDate = new Date(0);
    const vacationEndDate = new Date(0);
    const columnNumber = 1;
    const elementDate = new Date("1-1-2021");
    const userId = "1";
    const currentUserId = "1";

    const actualClassNames = makeStylesForUserDataRowElement({
      vacationStartDate,
      vacationEndDate,
      columnNumber,
      cellDate: elementDate,
      userId,
      currentUserId,
    });

    expect(actualClassNames).toEqual(expectedClassNames);
  });

  test("should have default, selectable, and selected class names, if second column cell with vacation selected", () => {
    const expectedClassNames = "cell cell--selectable cell--selected";
    const vacationStartDate = new Date("1-1-2021");
    const vacationEndDate = new Date("11-1-2021");
    const columnNumber = 1;
    const elementDate = new Date("1-1-2021");
    const userId = "1";
    const currentUserId = "1";

    const actualClassNames = makeStylesForUserDataRowElement({
      vacationStartDate,
      vacationEndDate,
      columnNumber,
      cellDate: elementDate,
      userId,
      currentUserId,
    });

    expect(actualClassNames).toEqual(expectedClassNames);
  });
});
