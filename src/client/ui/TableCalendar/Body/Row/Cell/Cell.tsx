import React from "react";
import { TableCalendarContext } from "../../../TableCalendarContext/TableCalendarContext";

type CellProps = { value: number | string; className: string; date?: Date };

export function Cell({ value, className, date }: CellProps) {
  return (
    <TableCalendarContext.Consumer>
      {(context) => (
        <div
          className={className}
          onClick={() => (date !== undefined ? context.handleClick(date) : undefined)}
          data-testid={"table-cell"}
        >
          {value}
        </div>
      )}
    </TableCalendarContext.Consumer>
  );
}
