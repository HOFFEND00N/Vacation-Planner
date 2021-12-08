import React from "react";
import cn from "classnames";
import "../../body.css";
import { Cell } from "../Cell";

export function HeaderRow({ daysInMonth }: { daysInMonth: number }) {
  const cells: JSX.Element[] = [];
  for (let j = 1; j < daysInMonth + 1; j++) {
    cells.push(<Cell value={j} className={"row__cell"} key={j + 1} />);
  }
  return (
    <div className={"row"} data-testid={"table-calendar-header-row"}>
      <Cell value={""} className={cn("row__cell", "row__first-column-cell")} key={0} />
      <Cell value={"Days"} className={cn("row__cell", "row__cell-days-column")} key={1} />
      {cells}
    </div>
  );
}
