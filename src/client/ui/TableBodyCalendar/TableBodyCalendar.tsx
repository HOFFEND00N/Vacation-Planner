import React, { useEffect, useState } from "react";
import moment from "moment";
import { getTeamMembers } from "../../application/getTeamMembers";
import { getVacations } from "../../application/getVacations";
import { User } from "../../domain/user";
import { Vacation, VacationType } from "../../domain/vacation";
import styles from "./table-body-calendar.module.css";
import { getVacationsForCurrentMonth } from "./getVacationsForCurrentMonth";

export function TableBodyCalendar({ today }: { today: moment.Moment }) {
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    (async () => {
      const team = await getTeamMembers();
      const vacations = await getVacations(team.map((teamMember) => teamMember.id));
      setTeamMembers(team);
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
          {makeTableBodyRow({ daysInMonth, rowNumber: i + 1, vacations: userVacations })}
        </div>
      );
    }
    return table;
  }

  function findVacations(vacations: Vacation[], userId: string) {
    return vacations.filter((vacation) => {
      return vacation.userId === userId;
    });
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

  function makeTableBodyRow({
    daysInMonth,
    rowNumber,
    vacations,
  }: {
    daysInMonth: number;
    rowNumber: number;
    vacations: Vacation[];
  }) {
    const row: JSX.Element[] = [];
    const vacationTypeByDay = getVacationsForCurrentMonth({ vacations, today });

    for (let day = 0; day < daysInMonth + 1; day++) {
      let classNames = `${styles["table-calendar-element"]} ${
        day === 0 ? styles["table-calendar-first-column-element"] : ""
      } `;

      if (vacationTypeByDay[day] === VacationType.APPROVED) {
        classNames = `${classNames} ${styles["table-calendar-element-vacation-approved"]}`;
      }
      if (vacationTypeByDay[day] === VacationType.PENDING_APPROVAL) {
        classNames = `${classNames} ${styles["table-calendar-element-vacation-pending-approval"]}`;
      }

      row.push(<div className={classNames}>{makeTableBodyElementContent(rowNumber, day)}</div>);
    }
    return row;
  }

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
