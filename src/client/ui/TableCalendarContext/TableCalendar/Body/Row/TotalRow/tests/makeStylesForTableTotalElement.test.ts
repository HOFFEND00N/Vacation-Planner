import { makeStylesForTableTotalElement } from "../makeStylesForTableTotalElement";

describe("make styles for table total Element", () => {
  test("pass 0 vacations, expect to return weak workload styles", () => {
    const expectedStyles = "row__cell row__total-cell__weak-workload";

    const actualStyles = makeStylesForTableTotalElement({
      vacationsCount: 0,
      columnNumber: 1,
      teamMembersCount: 8,
    });

    expect(actualStyles).toEqual(expectedStyles);
  });

  test("pass column number = 0, expect to return first column element styles", () => {
    const expectedStyles = "row__cell row__first-column-cell";

    const actualStyles = makeStylesForTableTotalElement({
      vacationsCount: 0,
      columnNumber: 0,
      teamMembersCount: 8,
    });

    expect(actualStyles).toEqual(expectedStyles);
  });

  test("pass vacation count = 1 and team members count = 8, expect to return weak workload styles", () => {
    const expectedStyles = "row__cell row__total-cell__weak-workload";

    const actualStyles = makeStylesForTableTotalElement({
      vacationsCount: 1,
      columnNumber: 1,
      teamMembersCount: 8,
    });

    expect(actualStyles).toEqual(expectedStyles);
  });

  test("pass vacation count = 2 and team members count = 8, expect to return medium workload styles", () => {
    const expectedStyles = "row__cell row__total-cell__medium-workload";

    const actualStyles = makeStylesForTableTotalElement({
      vacationsCount: 2,
      columnNumber: 1,
      teamMembersCount: 8,
    });

    expect(actualStyles).toEqual(expectedStyles);
  });

  test("pass vacation count = 4 and team members count = 8, expect to return heavy workload styles", () => {
    const expectedStyles = "row__cell row__total-cell__heavy-workload";

    const actualStyles = makeStylesForTableTotalElement({
      vacationsCount: 4,
      columnNumber: 1,
      teamMembersCount: 8,
    });

    expect(actualStyles).toEqual(expectedStyles);
  });
});