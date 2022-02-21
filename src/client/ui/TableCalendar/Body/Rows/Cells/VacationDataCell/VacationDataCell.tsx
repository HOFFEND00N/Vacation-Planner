import React, { useContext } from "react";
import cn from "classnames";
import { TableCalendarContext } from "../../../../TableCalendarContext/TableCalendarContext";
import "./vacation-data-cell.css";
import { Cell } from "../Cell";
import { VacationType } from "../../../../../../../shared";

type CellProps = {
  date: Date;
  isSelectable: boolean;
  isSelected: boolean;
  vacationType: VacationType;
};

export const VacationDataCell = ({ date, isSelectable, isSelected, vacationType }: CellProps) => {
  const { vacations, handleClick } = useContext(TableCalendarContext);

  const cellClassNames = cn({
    ["cell--vacation-approved"]: vacationType === VacationType.APPROVED,
    ["cell--vacation-pending-approval"]: vacationType === VacationType.PENDING_APPROVAL,
    ["cell--selectable"]: isSelectable,
    ["cell--selected"]: isSelectable && isSelected,
  });

  return (
    <Cell classNames={cellClassNames} onClick={() => (isSelectable ? handleClick({ date, vacations }) : undefined)} />
  );
};
