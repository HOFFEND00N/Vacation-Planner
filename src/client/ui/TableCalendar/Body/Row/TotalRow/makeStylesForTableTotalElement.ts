import "../../body.css";

export function makeStylesForTableTotalElement({
  vacationsCount,
  teamMembersCount,
}: {
  vacationsCount: number;
  teamMembersCount: number;
}) {
  let classNames = `cell`;

  const percentage = (vacationsCount / teamMembersCount) * 100;
  if (percentage < 25) {
    classNames = `${classNames} row__total-cell--weak-workload`;
  } else if (percentage >= 25 && percentage < 50) {
    classNames = `${classNames} row__total-cell--medium-workload`;
  } else {
    classNames = `${classNames} row__total-cell--heavy-workload`;
  }
  return classNames;
}
