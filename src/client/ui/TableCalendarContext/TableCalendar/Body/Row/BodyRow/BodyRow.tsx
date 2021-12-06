import React from "react";
import moment from "moment";
import cn from "classnames";
import { User } from "../../../../../../domain/user";
import { Vacation } from "../../../../../../domain/Vacation/vacation";
import { Cell } from "../Cell";
import "./body-row.css";
import { getVacationsTypeByDayForCurrentMonth } from "../../../../../../domain/Vacation/getVacationsTypeByDayForCurrentMonth/getVacationsTypeByDayForCurrentMonth";
import { getTotalVacationsDays } from "../../../../../../domain/Vacation/getTotalVacationDays/getTotalVacationDays";
import { makeStylesForTableCalendarBodyElement } from "./makeStylesForTableCalendarBodyElement";

export function BodyRow({
  daysInMonth,
  vacations,
  user,
  vacationStart,
  vacationEnd,
  currentUser,
  today,
  employeeName,
}: {
  daysInMonth: number;
  vacations: Vacation[];
  user: User;
  vacationStart: { date: Date; isSelected: boolean };
  vacationEnd: { date: Date; isSelected: boolean };
  currentUser: User;
  today: moment.Moment;
  employeeName: string;
}) {
  const cells: JSX.Element[] = [];
  const vacationTypeByDay = getVacationsTypeByDayForCurrentMonth({ vacations, today });
  for (let day = 1; day < daysInMonth + 1; day++) {
    const elementDate = new Date(today.year(), today.month(), day);
    const classNames = makeStylesForTableCalendarBodyElement({
      vacationStart,
      vacationEnd,
      elementDate,
      columnNumber: day,
      vacationTypeByDay,
      userId: user.id,
      currentUserId: currentUser.id,
    });
    cells.push(
      <Cell
        value={""}
        className={classNames}
        date={user.id === currentUser.id ? elementDate : undefined}
        key={day + 1}
      />
    );
  }
  return (
    <div className={"row"} data-testid={`row ${user.id}`}>
      <Cell value={employeeName} className={cn("row__cell", "row__first-column-cell")} key={0} />
      <Cell value={getTotalVacationsDays(vacations)} className={cn("row__cell", "row__cell-days-column")} key={1} />
      {cells}
    </div>
  );
}
