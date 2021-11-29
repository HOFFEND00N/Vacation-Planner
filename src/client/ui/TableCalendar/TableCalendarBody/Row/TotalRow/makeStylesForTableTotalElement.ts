import styles from "../../table-calendar-body.module.css";

export function makeStylesForTableTotalElement({
  vacationsCount,
  teamMembersCount,
  columnNumber,
}: {
  vacationsCount: number;
  teamMembersCount: number;
  columnNumber: number;
}) {
  let classNames = `${styles["table-calendar-element"]}`;

  if (columnNumber === 0) {
    classNames = `${classNames} ${styles["table-calendar-first-column-element"]} `;
  } else {
    const percentage = (vacationsCount / teamMembersCount) * 100;
    if (percentage < 25) {
      classNames = `${classNames} ${styles["table-calendar-total-element-weak-workload"]}`;
    } else if (percentage >= 25 && percentage < 50) {
      classNames = `${classNames} ${styles["table-calendar-total-element-medium-workload"]}`;
    } else {
      classNames = `${classNames} ${styles["table-calendar-total-element-heavy-workload"]}`;
    }
  }
  return classNames;
}
