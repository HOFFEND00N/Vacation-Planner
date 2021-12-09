import React, { useContext } from "react";
import { TableCalendarContext } from "../../../TableCalendarContext/TableCalendarContext";

type CellProps = { value: number | string; className: string; date?: Date };

export function Cell({ value, className, date }: CellProps) {
  const tableCalendarContext = useContext(TableCalendarContext);

  return (
    <div
      className={className}
      onClick={() => (date !== undefined ? tableCalendarContext.handleClick(date) : undefined)}
      data-testid={"table-cell"}
    >
      {value}
    </div>
  );
}
