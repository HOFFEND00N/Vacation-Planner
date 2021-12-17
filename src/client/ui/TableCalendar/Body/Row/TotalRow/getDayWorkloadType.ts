import { WorkloadType } from "../../../../../types";

export const getDayWorkloadType = ({
  vacationsCount,
  teamMembersCount,
}: {
  vacationsCount: number;
  teamMembersCount: number;
}) => {
  const dayWorkloadPercentage = (vacationsCount / teamMembersCount) * 100;

  if (dayWorkloadPercentage < 25) {
    return WorkloadType.Weak;
  }
  if (dayWorkloadPercentage < 50) {
    return WorkloadType.Medium;
  }
  return WorkloadType.Heavy;
};
