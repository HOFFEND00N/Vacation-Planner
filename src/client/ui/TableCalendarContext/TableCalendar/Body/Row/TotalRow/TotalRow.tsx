import React from "react";
import { Moment } from "moment";
import cn from "classnames";
import "./total-row.css";
import { Cell } from "../Cell";
import { getVacationsCountByDays, Vacation } from "../../../../../../domain/Vacation/vacation";
import { makeStylesForTableTotalElement } from "./makeStylesForTableTotalElement";

type TotalRowProps = { vacations: Vacation[]; today: Moment; daysInMonth: number; teamMembersCount: number };

export function TotalRow({ vacations, today, daysInMonth, teamMembersCount }: TotalRowProps) {
  const vacationsCountByDays = getVacationsCountByDays({ vacations, today });
  const cells: JSX.Element[] = [];
  for (let j = 1; j < daysInMonth + 1; j++) {
    const classNames = makeStylesForTableTotalElement({
      vacationsCount: vacationsCountByDays[j] ?? 0,
      teamMembersCount: teamMembersCount,
      columnNumber: j,
    });
    cells.push(<Cell value={""} className={classNames} key={j} />);
  }
  return (
    <div className={"row"} data-testid={"table-calendar-total-row"}>
      <Cell value={"Total"} className={cn("row__cell", "row__first-column-cell")} key={0} />
      {cells}
    </div>
  );
}
