import { makeStylesForTableTotalElement } from "../makeStylesForTableTotalElement";

describe("make styles for table total Element", () => {
  test("should return weak workload styles, when day workload percentage is 0", () => {
    const expectedStyles = "cell row__total-cell--weak-workload";

    const actualStyles = makeStylesForTableTotalElement(0);

    expect(actualStyles).toEqual(expectedStyles);
  });

  test("should return weak workload styles, when day workload percentage is 10", () => {
    const expectedStyles = "cell row__total-cell--weak-workload";

    const actualStyles = makeStylesForTableTotalElement(10);

    expect(actualStyles).toEqual(expectedStyles);
  });

  test("should return medium workload styles, when day workload percentage is 25", () => {
    const expectedStyles = "cell row__total-cell--medium-workload";

    const actualStyles = makeStylesForTableTotalElement(25);

    expect(actualStyles).toEqual(expectedStyles);
  });

  test("should return heavy workload styles, when day workload percentage is 50", () => {
    const expectedStyles = "cell row__total-cell--heavy-workload";

    const actualStyles = makeStylesForTableTotalElement(50);

    expect(actualStyles).toEqual(expectedStyles);
  });
});
