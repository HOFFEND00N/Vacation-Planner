import React from "react";
import { Moment } from "moment";
import cn from "classnames";
import styles from "../../table-calendar-body.module.css";
import { Cell } from "../Cell/Cell";
import { getVacationIntervalForCurrentMonth, Vacation } from "../../../../../domain/vacation";
import { makeStylesForTableTotalElement } from "./makeStylesForTableTotalElement";

type TotalRowProps = { vacations: Vacation[]; today: Moment; daysInMonth: number; teamMembersCount: number };

export function TotalRow({ vacations, today, daysInMonth, teamMembersCount }: TotalRowProps) {
  const vacationsCountByDays: Record<number, number> = {};
  vacations.map((vacation) => {
    const vacationInterval = getVacationIntervalForCurrentMonth({ vacation, today });
    for (let i = vacationInterval.start; i < vacationInterval.end + 1; i++) {
      vacationsCountByDays[i] = (vacationsCountByDays[i] ?? 0) + 1;
    }
  });
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
    <div className={styles["table-calendar-row"]} data-testid={"table-calendar-total-row"}>
      <Cell
        value={"Total"}
        className={cn(styles["table-calendar-element"], styles["table-calendar-first-column-element"])}
        key={0}
      />
      {cells}
    </div>
  );
}
