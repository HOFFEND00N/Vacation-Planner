import cn from "classnames";
import { VacationType } from "../../../../../domain/Vacation/vacation";
import { TableCalendarStateType } from "../../../TableCalendar";
import "./user-data-row.css";
import { isCellSelectable } from "./isCellSelectable";
import { isCellSelected } from "./isCellSelected";

export function makeStylesForUserDataRowElement({
  vacationStart,
  vacationEnd,
  columnNumber,
  cellDate,
  userId,
  currentUserId,
  vacationType,
}: {
  vacationStart: TableCalendarStateType;
  vacationEnd: TableCalendarStateType;
  columnNumber: number;
  cellDate: Date;
  userId: string;
  currentUserId: string;
  vacationType?: VacationType;
}) {
  let classNames = `cell`;

  switch (vacationType) {
    case VacationType.APPROVED:
      classNames = cn(classNames, "cell--vacation-approved");
      break;
    case VacationType.PENDING_APPROVAL:
      classNames = cn(classNames, "cell--vacation-pending-approval");
      break;
    default:
      break;
  }

  if (isCellSelectable({ userId, currentUserId })) {
    classNames = cn(classNames, "cell--selectable");
    if (
      vacationStart.date &&
      vacationEnd.date &&
      isCellSelected({
        vacationStartDate: vacationStart.date,
        vacationEndDate: vacationEnd.date,
        cellDate,
        columnNumber,
      })
    ) {
      classNames = cn(classNames, "cell--selected");
    }
  }

  return classNames;
}
