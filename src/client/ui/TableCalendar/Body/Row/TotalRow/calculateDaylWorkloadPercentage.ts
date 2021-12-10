export function calculateDaylWorkloadPercentage({
  vacationsCount,
  teamMembersCount,
}: {
  vacationsCount: number;
  teamMembersCount: number;
}) {
  return (vacationsCount / teamMembersCount) * 100;
}
