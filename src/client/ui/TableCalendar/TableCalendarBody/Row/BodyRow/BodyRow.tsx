import React from "react";
import { Moment } from "moment";
import cn from "classnames";
import styles from "../../table-calendar-body.module.css";
import { User } from "../../../../../domain/user";
import { getTotalVacationsDays, getVacationsTypeByDayForCurrentMonth, Vacation } from "../../../../../domain/vacation";
import { Cell } from "../Cell/Cell";
import { makeStylesForTableCalendarBodyElement } from "./makeStylesForTableCalendarBodyElement";

export function BodyRow({
  daysInMonth,
  vacations,
  user,
  vacationStart,
  vacationEnd,
  currentUser,
  today,
  handleOnClick,
  employeeName,
}: {
  daysInMonth: number;
  vacations: Vacation[];
  user: User;
  vacationStart: { date: Date; isSelected: boolean };
  vacationEnd: { date: Date; isSelected: boolean };
  currentUser: User;
  today: Moment;
  handleOnClick: (date: Date) => void;
  employeeName: string;
}) {
  const cells: JSX.Element[] = [];
  const vacationTypeByDay = getVacationsTypeByDayForCurrentMonth({ vacations, today });
  for (let day = 1; day < daysInMonth + 1; day++) {
    const elementDate = new Date(today.year(), today.month(), day);
    const classNames = makeStylesForTableCalendarBodyElement({
      vacationStart,
      elementDate,
      columnNumber: day,
      vacationTypeByDay,
      vacationEnd,
      userId: user.id,
      currentUserId: currentUser.id,
    });
    cells.push(
      <Cell
        value={""}
        className={classNames}
        handleOnClick={user.id === currentUser.id ? () => handleOnClick(elementDate) : undefined}
        key={day + 1}
      />
    );
  }
  return (
    <div className={styles["table-calendar-row"]}>
      <Cell
        value={employeeName}
        className={cn(styles["table-calendar-element"], styles["table-calendar-first-column-element"])}
        key={0}
      />
      <Cell
        value={getTotalVacationsDays(vacations)}
        className={cn(styles["table-calendar-element"], styles["table-calendar-element-days-column"])}
        key={1}
      />
      {cells}
    </div>
  );
}
