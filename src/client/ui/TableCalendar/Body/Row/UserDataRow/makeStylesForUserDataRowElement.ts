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
  let classNames = cn("cell", {
    ["cell--vacation-approved"]: vacationType === VacationType.APPROVED,
    ["cell--vacation-pending-approval"]: vacationType === VacationType.PENDING_APPROVAL,
  });

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
