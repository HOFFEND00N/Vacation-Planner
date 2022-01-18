import React, { useContext } from "react";
import cn from "classnames";
import { TableCalendarContext } from "../../../../TableCalendarContext/TableCalendarContext";
import { VacationType } from "../../../../../../domain/types";
import "./vacation-data-cell.css";
import { Cell } from "../Cell";

type CellProps = {
  date: Date;
  isSelectable: boolean;
  isSelected: boolean;
  vacationType: VacationType;
};

export const VacationDataCell = ({ date, isSelectable, isSelected, vacationType }: CellProps) => {
  const tableCalendarContext = useContext(TableCalendarContext);

  const cellClassNames = cn({
    ["cell--vacation-approved"]: vacationType === VacationType.APPROVED,
    ["cell--vacation-pending-approval"]: vacationType === VacationType.PENDING_APPROVAL,
    ["cell--selectable"]: isSelectable,
    ["cell--selected"]: isSelectable && isSelected,
  });

  return (
    <Cell
      classNames={cellClassNames}
      onClick={() => (isSelectable ? tableCalendarContext.handleClick(date as Date) : undefined)}
    />
  );
};
