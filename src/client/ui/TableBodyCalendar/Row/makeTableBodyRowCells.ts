import cn from "classnames";
import { Moment } from "moment";
import { getTotalVacationsDays, getVacationsTypeByDayForCurrentMonth, Vacation } from "../../../domain/vacation";
import { User } from "../../../domain/user";
import { Cell } from "../../../domain/cell";
import styles from "../table-body-calendar.module.css";
import { makeStylesForTableBodyCalendarElement } from "../makeStylesForTableBodyCalendarElement";

export function makeTableBodyRowCells({
  daysInMonth,
  rowNumber,
  vacations,
  user,
  teamMembers,
  vacationStart,
  vacationEnd,
  currentUser,
  today,
  handleOnClick,
}: {
  daysInMonth: number;
  rowNumber: number;
  vacations: Vacation[];
  user: User;
  teamMembers: User[];
  vacationStart: { date: Date; isSelected: boolean };
  vacationEnd: { date: Date; isSelected: boolean };
  currentUser: User;
  today: Moment;
  handleOnClick: (date: Date) => void;
}) {
  const row: Cell[] = [];
  const vacationTypeByDay = getVacationsTypeByDayForCurrentMonth({ vacations, today });
  row.push({
    value: teamMembers[rowNumber - 1].name,
    classNames: cn(styles["table-calendar-element"], styles["table-calendar-first-column-element"]),
  });
  row.push({
    value: getTotalVacationsDays(vacations),
    classNames: cn(styles["table-calendar-element"], styles["table-calendar-element-days-column"]),
  });

  for (let day = 1; day < daysInMonth + 1; day++) {
    const elementDate = new Date(today.year(), today.month(), day);
    const classNames = makeStylesForTableBodyCalendarElement({
      vacationStart,
      elementDate,
      columnNumber: day,
      vacationTypeByDay,
      vacationEnd,
      userId: user.id,
      currentUserId: currentUser.id,
    });

    row.push({
      value: "",
      classNames,
      onClick: user.id === currentUser.id ? () => handleOnClick(elementDate) : undefined,
    });
  }
  return row;
}
