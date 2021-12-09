import cn from "classnames";
import { VacationType } from "../../../../../domain/Vacation/vacation";
import { VacationTypeByDay } from "../../../../../types";
import { TableCalendarStateType } from "../../../TableCalendar";
import "./user-data-row.css";

export function makeStylesForUserDataRowElement({
  vacationStart,
  vacationEnd,
  vacationTypeByDay,
  columnNumber,
  elementDate,
  userId,
  currentUserId,
}: {
  vacationStart: TableCalendarStateType;
  vacationEnd: TableCalendarStateType;
  vacationTypeByDay: VacationTypeByDay;
  columnNumber: number;
  elementDate: Date;
  userId: string;
  currentUserId: string;
}) {
  let classNames = `row__cell`;

  if (vacationTypeByDay[columnNumber] === VacationType.APPROVED) {
    classNames = cn(classNames, "row__cell--vacation-approved");
  }
  if (vacationTypeByDay[columnNumber] === VacationType.PENDING_APPROVAL) {
    classNames = cn(classNames, "row__cell--vacation-pending-approval");
  }
  if (columnNumber === 0) {
    classNames = cn(classNames, "row__first-column-cell");
  } else if (userId === currentUserId) {
    classNames = cn(classNames, "row__cell--selectable");
  }

  if (
    vacationStart.date &&
    vacationEnd.date &&
    elementDate >= vacationStart.date &&
    elementDate <= vacationEnd.date &&
    userId === currentUserId &&
    columnNumber !== 0
  ) {
    classNames = cn(classNames, "row__cell--selected");
  }

  return classNames;
}
