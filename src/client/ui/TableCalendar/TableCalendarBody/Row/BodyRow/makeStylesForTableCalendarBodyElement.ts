import { VacationType } from "../../../../../domain/vacation";
import { VacationTypeByDay } from "../../../../../types";
import styles from "../../table-calendar-body.module.css";

export function makeStylesForTableCalendarBodyElement({
  vacationStart,
  vacationEnd,
  vacationTypeByDay,
  columnNumber,
  elementDate,
  userId,
  currentUserId,
}: {
  vacationStart: { date: Date; isSelected: boolean };
  vacationEnd: { date: Date; isSelected: boolean };
  vacationTypeByDay: VacationTypeByDay;
  columnNumber: number;
  elementDate: Date;
  userId: string;
  currentUserId: string;
}) {
  let classNames = `${styles["table-calendar-element"]}`;

  if (vacationTypeByDay[columnNumber] === VacationType.APPROVED) {
    classNames = `${classNames} ${styles["table-calendar-element-vacation-approved"]}`;
  }
  if (vacationTypeByDay[columnNumber] === VacationType.PENDING_APPROVAL) {
    classNames = `${classNames} ${styles["table-calendar-element-vacation-pending-approval"]}`;
  }
  if (columnNumber === 0) {
    classNames = `${classNames} ${styles["table-calendar-first-column-element"]} `;
  } else if (userId === currentUserId) {
    classNames = `${classNames} ${styles["table-calendar-element-selectable"]}`;
  }

  if (
    elementDate >= vacationStart.date &&
    elementDate <= vacationEnd.date &&
    userId === currentUserId &&
    columnNumber !== 0
  ) {
    classNames = `${classNames} ${styles["table-calendar-element-selected"]}`;
  }

  return classNames;
}
