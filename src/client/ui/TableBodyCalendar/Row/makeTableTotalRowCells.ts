import cn from "classnames";
import { Moment } from "moment";
import { getVacationIntervalForCurrentMonth, Vacation } from "../../../domain/vacation";
import { Cell } from "../../../domain/cell";
import styles from "../table-body-calendar.module.css";
import { makeStylesForTableTotalElement } from "../makeStylesForTableTotalElement";
import { User } from "../../../domain/user";

export function makeTableTotalRowCells({
  daysInMonth,
  vacations,
  teamMembers,
  today,
}: {
  daysInMonth: number;
  vacations: Vacation[];
  teamMembers: User[];
  today: Moment;
}) {
  const row: Cell[] = [];
  row.push({
    value: "Total",
    classNames: cn(styles["table-calendar-element"], styles["table-calendar-first-column-element"]),
  });

  const vacationsCountByDays: Record<number, number> = {};
  vacations.map((vacation) => {
    const vacationInterval = getVacationIntervalForCurrentMonth({ vacation, today });
    for (let i = vacationInterval.start; i < vacationInterval.end + 1; i++) {
      vacationsCountByDays[i] = (vacationsCountByDays[i] ?? 0) + 1;
    }
  });

  for (let j = 1; j < daysInMonth + 1; j++) {
    const classNames = makeStylesForTableTotalElement({
      vacationsCount: vacationsCountByDays[j] ?? 0,
      teamMembersCount: teamMembers.length,
      columnNumber: j,
    });
    row.push({ value: "", classNames });
  }
  return row;
}
