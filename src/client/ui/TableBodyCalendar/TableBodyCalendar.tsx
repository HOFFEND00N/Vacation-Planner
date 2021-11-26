import React, { useEffect, useState } from "react";
import moment from "moment";
import cn from "classnames";
import { getTeamMembers } from "../../application/getTeamMembers";
import { getVacations } from "../../application/getVacations";
import { User } from "../../domain/user";
import {
  getVacationIntervalForCurrentMonth,
  getVacationsTypeByDayForCurrentMonth,
  findUserVacations,
  getTotalVacationsDays,
  Vacation,
} from "../../domain/vacation";
import { Cell } from "../../domain/cell";
import styles from "./table-body-calendar.module.css";
import { makeStylesForTableBodyCalendarElement } from "./makeStylesForTableBodyCalendarElement";
import { makeStylesForTableTotalElement } from "./makeStylesForTableTotalElement";
import { Row } from "./Row/Row";

type propsType = {
  today: moment.Moment;
  vacationStart: { date: Date; isSelected: boolean };
  vacationEnd: { date: Date; isSelected: boolean };
  handleVacationSelect: (date: Date) => void;
};

export function TableBodyCalendar({ today, vacationStart, vacationEnd, handleVacationSelect }: propsType) {
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  // TODO: useReducer()
  // TODO: refactor to use components
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({ id: "", name: "" });
  useEffect(() => {
    (async () => {
      const { team, currentUser } = await getTeamMembers();
      setTeamMembers(team);
      setCurrentUser(currentUser);
      const vacations = await getVacations(team.map((teamMember) => teamMember.id));
      setVacations(vacations);
      setIsDataFetched(true);
    })();
  }, []);

  function makeTable() {
    const table: JSX.Element[] = [];
    const daysInMonth = today.daysInMonth();
    table.push(<Row cells={makeTableHeaderRow(daysInMonth)} />);
    for (let i = 0; i < teamMembers.length; i++) {
      const userVacations = findUserVacations({ vacations, userId: teamMembers[i].id, year: today.year() });
      table.push(
        <Row
          cells={makeTableBodyRow({ daysInMonth, rowNumber: i + 1, vacations: userVacations, user: teamMembers[i] })}
        />
      );
    }
    table.push(<Row cells={makeTableTotalRow(daysInMonth, vacations)} />);
    return table;
  }

  function makeTableHeaderRow(daysInMonth: number): Cell[] {
    const row: Cell[] = [];
    row.push({
      value: "",
      classNames: cn(styles["table-calendar-element"], styles["table-calendar-first-column-element"]),
    });
    row.push({
      value: "Days",
      classNames: cn(styles["table-calendar-element"], styles["table-calendar-element-days-column"]),
    });

    for (let j = 1; j < daysInMonth + 1; j++) {
      row.push({
        value: j,
        classNames: styles["table-calendar-element"],
      });
    }
    return row;
  }

  function makeTableBodyRow({
    daysInMonth,
    rowNumber,
    vacations,
    user,
  }: {
    daysInMonth: number;
    rowNumber: number;
    vacations: Vacation[];
    user: User;
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
        onClick: user.id === currentUser.id ? () => handleVacationSelect(elementDate) : undefined,
      });
    }
    return row;
  }

  function makeTableTotalRow(daysInMonth: number, vacations: Vacation[]) {
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

  if (isDataFetched) {
    return <div>{makeTable()}</div>;
  } else {
    return <h1> Please wait, searching your teammates... </h1>;
  }
}
