import { makeStylesForTableTotalElement } from "../makeStylesForTableTotalElement";

describe("make styles for table total Element", () => {
  test("should return weak workload styles, when 0 vacations passed", () => {
    const expectedStyles = "row__cell row__total-cell--weak-workload";

    const actualStyles = makeStylesForTableTotalElement({
      vacationsCount: 0,
      teamMembersCount: 8,
    });

    expect(actualStyles).toEqual(expectedStyles);
  });

  test("should return weak workload styles, when vacation count = 1 and team members count = 8 passed", () => {
    const expectedStyles = "row__cell row__total-cell--weak-workload";

    const actualStyles = makeStylesForTableTotalElement({
      vacationsCount: 1,
      teamMembersCount: 8,
    });

    expect(actualStyles).toEqual(expectedStyles);
  });

  test("should return medium workload styles, when vacation count = 2 and team members count = 8 passed", () => {
    const expectedStyles = "row__cell row__total-cell--medium-workload";

    const actualStyles = makeStylesForTableTotalElement({
      vacationsCount: 2,
      teamMembersCount: 8,
    });

    expect(actualStyles).toEqual(expectedStyles);
  });

  test("should return heavy workload styles, when vacation count = 4 and team members count = 8 passed", () => {
    const expectedStyles = "row__cell row__total-cell--heavy-workload";

    const actualStyles = makeStylesForTableTotalElement({
      vacationsCount: 4,
      teamMembersCount: 8,
    });

    expect(actualStyles).toEqual(expectedStyles);
  });
});
