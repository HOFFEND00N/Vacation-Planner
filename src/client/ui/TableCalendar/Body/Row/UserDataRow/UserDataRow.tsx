import React from "react";
import moment from "moment";
import cn from "classnames";
import { User } from "../../../../../domain/user";
import { Vacation } from "../../../../../domain/Vacation/vacation";
import { Cell } from "../Cell";
import "./user-data-row.css";
import { getVacationsTypeByDayForCurrentMonth } from "../../../../../domain/Vacation/getVacationsTypeByDayForCurrentMonth";
import { getTotalVacationsDays } from "../../../../../domain/Vacation/getTotalVacationsDays";
import { TableCalendarStateType } from "../../../TableCalendar";
import { makeStylesForUserDataRowElement } from "./makeStylesForUserDataRowElement";

export function UserDataRow({
  daysInMonth,
  vacations,
  user,
  vacationStart,
  vacationEnd,
  currentUser,
  currentTableCalendarDate,
  employeeName,
}: {
  daysInMonth: number;
  vacations: Vacation[];
  user: User;
  vacationStart: TableCalendarStateType;
  vacationEnd: TableCalendarStateType;
  currentUser: User;
  currentTableCalendarDate: moment.Moment;
  employeeName: string;
}) {
  const cells: JSX.Element[] = [];
  const vacationTypeByDay = getVacationsTypeByDayForCurrentMonth({
    vacations,
    currentTableCalendarDate: currentTableCalendarDate,
  });
  for (let day = 1; day < daysInMonth + 1; day++) {
    const elementDate = new Date(currentTableCalendarDate.year(), currentTableCalendarDate.month(), day);
    const classNames = makeStylesForUserDataRowElement({
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
