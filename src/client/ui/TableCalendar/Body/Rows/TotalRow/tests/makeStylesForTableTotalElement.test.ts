import { makeStylesForTableTotalElement } from "../makeStylesForTableTotalElement";
import { WorkloadType } from "../../../../../../types";

describe("make styles for table total Element", () => {
  test("should return weak workload styles, when day workload type = weak", () => {
    const expectedStyles = "row__total-cell--weak-workload";

    const actualStyles = makeStylesForTableTotalElement(WorkloadType.Weak);

    expect(actualStyles).toEqual(expectedStyles);
  });

  test("should return medium workload styles, when day workload type = medium", () => {
    const expectedStyles = "row__total-cell--medium-workload";

    const actualStyles = makeStylesForTableTotalElement(WorkloadType.Medium);

    expect(actualStyles).toEqual(expectedStyles);
  });

  test("should return heavy workload styles, when day workload type = heavy", () => {
    const expectedStyles = "row__total-cell--heavy-workload";

    const actualStyles = makeStylesForTableTotalElement(WorkloadType.Heavy);

    expect(actualStyles).toEqual(expectedStyles);
  });
});
