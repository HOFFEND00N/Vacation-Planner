import { VacationType } from "../../domain/vacation";
import { VacationTypeByDay } from "../../types";
import styles from "./table-body-calendar.module.css";

export function styleTableCalendarElement({
  vacationStart,
  vacationEnd,
  vacationTypeByDay,
  day,
  elementDate,
  userId,
  currentUserId,
}: {
  vacationStart: { date: Date; isSelected: boolean };
  vacationEnd: { date: Date; isSelected: boolean };
  vacationTypeByDay: VacationTypeByDay;
  day: number;
  elementDate: Date;
  userId: string;
  currentUserId: string;
}) {
  let classNames = `${styles["table-calendar-element"]}`;

  if (vacationTypeByDay[day] === VacationType.APPROVED) {
    classNames = `${classNames} ${styles["table-calendar-element-vacation-approved"]}`;
  }
  if (vacationTypeByDay[day] === VacationType.PENDING_APPROVAL) {
    classNames = `${classNames} ${styles["table-calendar-element-vacation-pending-approval"]}`;
  }
  if (day === 0) {
    classNames = `${classNames} ${styles["table-calendar-first-column-element"]} `;
  } else if (userId === currentUserId) {
    classNames = `${classNames} ${styles["table-calendar-element-selectable"]}`;
  }

  if (elementDate >= vacationStart.date && elementDate <= vacationEnd.date && userId === currentUserId && day !== 0) {
    classNames = `${classNames} ${styles["table-calendar-element-selected"]}`;
  }

  return classNames;
}
