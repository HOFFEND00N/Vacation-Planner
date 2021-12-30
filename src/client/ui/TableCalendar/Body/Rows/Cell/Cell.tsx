import React, { useContext } from "react";
import cn from "classnames";
import { TableCalendarContext } from "../../../TableCalendarContext/TableCalendarContext";
import { WorkloadType } from "../../../../../types";
import { VacationType } from "../../../../../domain/types";
import "./cell.css";

type CellProps = {
  value?: number | string;
  classNames?: string;
  isDaysColumn?: boolean;
  date?: Date;
  cellSelectable?: boolean;
  cellSelected?: boolean;
  workloadType?: WorkloadType;
  vacationType?: VacationType;
};

export const Cell = ({
  value,
  isDaysColumn,
  date,
  classNames,
  cellSelectable,
  workloadType,
  cellSelected,
  vacationType,
}: CellProps) => {
  const tableCalendarContext = useContext(TableCalendarContext);

  const cellClassNames = cn("cell", {
    ["cell-days-column"]: isDaysColumn,
    [`${classNames}`]: !!classNames,
    ["total-cell--weak-workload"]: WorkloadType.Weak === workloadType,
    ["total-cell--medium-workload"]: WorkloadType.Medium === workloadType,
    ["total-cell--heavy-workload"]: WorkloadType.Heavy === workloadType,
    ["cell--vacation-approved"]: vacationType === VacationType.APPROVED,
    ["cell--vacation-pending-approval"]: vacationType === VacationType.PENDING_APPROVAL,
    ["cell--selectable"]: cellSelectable,
    ["cell--selected"]: cellSelectable && cellSelected,
  });

  return (
    <div
      className={cellClassNames}
      onClick={() => (cellSelectable ? tableCalendarContext.handleClick(date as Date) : undefined)}
      data-testid="table-cell"
    >
      {value}
    </div>
  );
};
