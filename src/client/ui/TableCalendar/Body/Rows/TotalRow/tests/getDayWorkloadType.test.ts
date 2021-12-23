import { WorkloadType } from "../../../../../../types";
import { getDayWorkloadType } from "../getDayWorkloadType";

describe("get day workload type", () => {
  test("should return weak workload type, when vacations count = 0", () => {
    expect(getDayWorkloadType({ vacationsCount: 0, teamMembersCount: 1 })).toBe(WorkloadType.Weak);
  });

  test("should return weak workload type, when vacations count = 1, team members count = 5", () => {
    expect(getDayWorkloadType({ vacationsCount: 1, teamMembersCount: 5 })).toBe(WorkloadType.Weak);
  });

  test("should return medium workload type, when vacations count = 2, team members count = 5", () => {
    expect(getDayWorkloadType({ vacationsCount: 2, teamMembersCount: 5 })).toBe(WorkloadType.Medium);
  });

  test("should return heavy workload type, when vacations count = 3, team members count = 5", () => {
    expect(getDayWorkloadType({ vacationsCount: 3, teamMembersCount: 5 })).toBe(WorkloadType.Heavy);
  });
});
