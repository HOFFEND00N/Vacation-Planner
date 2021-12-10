import "../../body.css";

export function makeStylesForTableTotalElement(dayWorkloadPercentage: number) {
  let classNames = `cell`;

  if (dayWorkloadPercentage < 25) {
    classNames = `${classNames} row__total-cell--weak-workload`;
  } else if (dayWorkloadPercentage >= 25 && dayWorkloadPercentage < 50) {
    classNames = `${classNames} row__total-cell--medium-workload`;
  } else {
    classNames = `${classNames} row__total-cell--heavy-workload`;
  }
  return classNames;
}
