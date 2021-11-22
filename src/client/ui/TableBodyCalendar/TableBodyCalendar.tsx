import React, { useEffect, useState } from "react";
import moment from "moment";
import { getTeamMembers } from "../../application/getTeamMembers";
import { getVacations } from "../../application/getVacations";
import { User } from "../../domain/user";
import { Vacation } from "../../domain/vacation";
import styles from "./table-body-calendar.module.css";
import { getVacationsForCurrentMonth } from "./getVacationsForCurrentMonth";
import { styleTableCalendarElement } from "./styleTableCalendarElement";

export function TableBodyCalendar({ today }: { today: moment.Moment }) {
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({ id: "", name: "" });
  const [vacationStart, setVacationStart] = useState<{ date: Date; isSelected: boolean }>({
    date: new Date(0),
    isSelected: false,
  });
  const [vacationEnd, setVacationEnd] = useState<{ date: Date; isSelected: boolean }>({
    date: new Date(0),
    isSelected: false,
  });

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
    table.push(<div className={styles["table-calendar-row"]}>{makeTableHeaderRow(daysInMonth)}</div>);
    for (let i = 0; i < teamMembers.length; i++) {
      const userVacations = findVacations(vacations, teamMembers[i].id);
      table.push(
        <div className={styles["table-calendar-row"]}>
          {makeTableBodyRow({ daysInMonth, rowNumber: i + 1, vacations: userVacations, user: teamMembers[i] })}
        </div>
      );
    }
    return table;
  }

  function makeTableHeaderRow(daysInMonth: number) {
    const row: JSX.Element[] = [];
    for (let j = 0; j < daysInMonth + 1; j++) {
      row.push(
        <div
          className={`${styles["table-calendar-element"]} ${
            j === 0 ? styles["table-calendar-first-column-element"] : ""
          }`}
        >
          {makeTableHeaderElementContent(j)}
        </div>
      );
    }
    return row;
  }

  function findVacations(vacations: Vacation[], userId: string) {
    return vacations.filter((vacation) => {
      return vacation.userId === userId;
    });
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
    const row: JSX.Element[] = [];
    const vacationTypeByDay = getVacationsForCurrentMonth({ vacations, today });
    let isSelectable = false;

    for (let day = 0; day < daysInMonth + 1; day++) {
      const elementDate = new Date(today.year(), today.month(), day);
      const classNames = styleTableCalendarElement({
        vacationStart,
        elementDate,
        day,
        vacationTypeByDay,
        vacationEnd,
        userId: user.id,
        currentUserId: currentUser.id,
      });

      if (user.id === currentUser.id) {
        isSelectable = true;
      }
      row.push(
        <div
          className={classNames}
          {...(isSelectable && {
            onClick: () => {
              handleVacationSelect(elementDate);
            },
          })}
        >
          {makeTableBodyElementContent(rowNumber, day)}
        </div>
      );
    }
    return row;
  }

  const handleVacationSelect = (date: Date) => {
    if (!vacationStart.isSelected) {
      setVacationStart({ isSelected: true, date });
      setVacationEnd({ isSelected: false, date });
    } else if (!vacationEnd.isSelected) {
      setVacationEnd({ isSelected: true, date });
    } else {
      setVacationStart({ isSelected: true, date });
      setVacationEnd({ isSelected: false, date });
    }
  };

  function makeTableHeaderElementContent(columnNumber: number) {
    return columnNumber === 0 ? "" : columnNumber;
  }

  function makeTableBodyElementContent(rowNumber: number, columnNumber: number) {
    return columnNumber === 0 ? teamMembers[rowNumber - 1].name : "";
  }

  if (isDataFetched) {
    return <div>{makeTable()}</div>;
  } else {
    return <h1> Please wait, searching your teammates... </h1>;
  }
}
