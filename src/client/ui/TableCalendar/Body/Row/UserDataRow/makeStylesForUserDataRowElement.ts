import cn from "classnames";
import "./user-data-row.css";
import { VacationType } from "../../../../../domain/types";
import { isCellSelectable } from "./isCellSelectable";
import { isCellSelected } from "./isCellSelected";

export const makeStylesForUserDataRowElement = ({
  vacationStartDate,
  vacationEndDate,
  columnNumber,
  cellDate,
  userId,
  currentUserId,
  vacationType,
}: {
  vacationStartDate?: Date;
  vacationEndDate?: Date;
  columnNumber: number;
  cellDate: Date;
  userId: string;
  currentUserId: string;
  vacationType?: VacationType;
}) => {
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
      isCellSelected({
        vacationStartDate: vacationStartDate,
        vacationEndDate: vacationEndDate,
        cellDate,
        columnNumber,
      })
    ) {
      classNames = cn(classNames, "cell--selected");
    }
  }

  return classNames;
};
