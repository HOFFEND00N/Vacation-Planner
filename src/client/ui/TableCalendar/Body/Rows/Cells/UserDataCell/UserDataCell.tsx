import React, { useContext } from "react";
import cn from "classnames";
import { TableCalendarContext } from "../../../../TableCalendarContext/TableCalendarContext";
import { VacationType } from "../../../../../../domain/types";
import "./user-data-cell.css";
import { Cell } from "../Cell";

type CellProps = {
  value?: number | string;
  date?: Date;
  isSelectable?: boolean;
  isSelected?: boolean;
  isDaysColumn?: boolean;
  vacationType?: VacationType;
};

export const UserDataCell = ({ value, date, isSelectable, isSelected, vacationType, isDaysColumn }: CellProps) => {
  const tableCalendarContext = useContext(TableCalendarContext);

  const cellClassNames = cn({
    ["cell--vacation-approved"]: vacationType === VacationType.APPROVED,
    ["cell--vacation-pending-approval"]: vacationType === VacationType.PENDING_APPROVAL,
    ["cell--selectable"]: isSelectable,
    ["cell--selected"]: isSelectable && isSelected,
  });

  return (
    <Cell
      isDaysColumn={isDaysColumn}
      classNames={cellClassNames}
      onClick={() => (isSelectable ? tableCalendarContext.handleClick(date as Date) : undefined)}
      data-testid="table-cell"
      value={value}
    />
  );
};
