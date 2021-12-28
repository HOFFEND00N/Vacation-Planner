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
  const cellSelectable = isCellSelectable({ userId, currentUserId });
  const cellSelected = isCellSelected({
    vacationStartDate: vacationStartDate,
    vacationEndDate: vacationEndDate,
    cellDate,
    columnNumber,
  });

  return cn({
    ["cell--vacation-approved"]: vacationType === VacationType.APPROVED,
    ["cell--vacation-pending-approval"]: vacationType === VacationType.PENDING_APPROVAL,
    ["cell--selectable"]: cellSelectable,
    ["cell--selected"]: cellSelectable && cellSelected,
  });
};
