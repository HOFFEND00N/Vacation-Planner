import React, { useContext } from "react";
import cn from "classnames";
import { TableCalendarContext } from "../../../TableCalendarContext/TableCalendarContext";

type CellProps = {
  value?: number | string;
  classNames?: string;
  isDaysColumn?: boolean;
  date?: Date;
  isCellSelectable?: boolean;
};

export const Cell = ({ value, isDaysColumn, date, classNames, isCellSelectable }: CellProps) => {
  const tableCalendarContext = useContext(TableCalendarContext);

  if (isDaysColumn) {
    classNames = cn("cell-days-column", classNames);
  }

  return (
    <div
      className={cn("cell", classNames)}
      onClick={() => (isCellSelectable ? tableCalendarContext.handleClick(date as Date) : undefined)}
      data-testid={"table-cell"}
    >
      {value}
    </div>
  );
};
