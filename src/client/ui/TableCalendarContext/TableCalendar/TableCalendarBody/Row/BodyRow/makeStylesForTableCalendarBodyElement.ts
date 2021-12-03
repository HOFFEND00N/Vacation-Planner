import cn from "classnames";
import { VacationType } from "../../../../../../domain/vacation";
import { VacationTypeByDay } from "../../../../../../types";
import styles from "../../body.module.css";

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
  let classNames = `${styles["row__cell"]}`;

  if (vacationTypeByDay[columnNumber] === VacationType.APPROVED) {
    classNames = cn(classNames, styles["row__cell__vacation-approved"]);
  }
  if (vacationTypeByDay[columnNumber] === VacationType.PENDING_APPROVAL) {
    classNames = cn(classNames, styles["row__cell__vacation-pending-approval"]);
  }
  if (columnNumber === 0) {
    classNames = cn(classNames, styles["row__first-column-cell"]);
  } else if (userId === currentUserId) {
    classNames = cn(classNames, styles["row__cell__selectable"]);
  }

  if (
    elementDate >= vacationStart.date &&
    elementDate <= vacationEnd.date &&
    userId === currentUserId &&
    columnNumber !== 0
  ) {
    classNames = cn(classNames, styles["row__cell__selected"]);
  }

  return classNames;
}
