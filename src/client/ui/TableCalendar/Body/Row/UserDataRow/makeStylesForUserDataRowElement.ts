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
  let classNames = `cell`;

  if (vacationTypeByDay[columnNumber] === VacationType.APPROVED) {
    classNames = cn(classNames, "cell--vacation-approved");
  }
  if (vacationTypeByDay[columnNumber] === VacationType.PENDING_APPROVAL) {
    classNames = cn(classNames, "cell--vacation-pending-approval");
  }
  if (userId === currentUserId) {
    classNames = cn(classNames, "cell--selectable");
  }

  if (
    vacationStart.date &&
    vacationEnd.date &&
    elementDate >= vacationStart.date &&
    elementDate <= vacationEnd.date &&
    userId === currentUserId &&
    columnNumber !== 0
  ) {
    classNames = cn(classNames, "cell--selected");
  }

  return classNames;
}
