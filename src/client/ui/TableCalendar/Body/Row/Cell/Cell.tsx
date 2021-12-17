import React, { useContext } from "react";
import { TableCalendarContext } from "../../../TableCalendarContext/TableCalendarContext";

type CellProps = { value: number | string; classNames?: string; isDaysColumn?: boolean; date?: Date };

export const Cell = ({ value, isDaysColumn, date, classNames }: CellProps) => {
  const tableCalendarContext = useContext(TableCalendarContext);

  if (isDaysColumn) {
    classNames = `${classNames} cell-days-column`;
  }

  return (
    <div
      className={`cell ${classNames}`}
      onClick={() => (date !== undefined ? tableCalendarContext.handleClick(date) : undefined)}
      data-testid={"table-cell"}
    >
      {value}
    </div>
  );
};
