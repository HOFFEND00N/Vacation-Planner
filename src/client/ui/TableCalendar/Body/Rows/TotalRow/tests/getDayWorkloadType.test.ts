import { WorkloadType } from "../../../../../../types";
import { getDayWorkloadType } from "../getDayWorkloadType";

describe("get day workload type", () => {
  test("should return weak workload type, when vacations count = 0", () => {
    const expectedWorkloadType = WorkloadType.Weak;

    const actualWorkloadType = getDayWorkloadType({ vacationsCount: 0, teamMembersCount: 1 });

    expect(actualWorkloadType).toEqual(expectedWorkloadType);
  });

  test("should return weak workload type, when vacations count = 1, team members count = 5", () => {
    const expectedWorkloadType = WorkloadType.Weak;

    const actualWorkloadType = getDayWorkloadType({ vacationsCount: 1, teamMembersCount: 5 });

    expect(actualWorkloadType).toEqual(expectedWorkloadType);
  });

  test("should return medium workload type, when vacations count = 2, team members count = 5", () => {
    const expectedWorkloadType = WorkloadType.Medium;

    const actualWorkloadType = getDayWorkloadType({ vacationsCount: 2, teamMembersCount: 5 });

    expect(actualWorkloadType).toEqual(expectedWorkloadType);
  });

  test("should return heavy workload type, when vacations count = 3, team members count = 5", () => {
    const expectedWorkloadType = WorkloadType.Heavy;

    const actualWorkloadType = getDayWorkloadType({ vacationsCount: 3, teamMembersCount: 5 });

    expect(actualWorkloadType).toEqual(expectedWorkloadType);
  });
});
