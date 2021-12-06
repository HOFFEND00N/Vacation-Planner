import "../../body.css";

export function makeStylesForTableTotalElement({
  vacationsCount,
  teamMembersCount,
  columnNumber,
}: {
  vacationsCount: number;
  teamMembersCount: number;
  columnNumber: number;
}) {
  let classNames = `row__cell`;

  if (columnNumber === 0) {
    classNames = `${classNames} row__first-column-cell`;
  } else {
    const percentage = (vacationsCount / teamMembersCount) * 100;
    if (percentage < 25) {
      classNames = `${classNames} row__total-cell__weak-workload`;
    } else if (percentage >= 25 && percentage < 50) {
      classNames = `${classNames} row__total-cell__medium-workload`;
    } else {
      classNames = `${classNames} row__total-cell__heavy-workload`;
    }
  }
  return classNames;
}
