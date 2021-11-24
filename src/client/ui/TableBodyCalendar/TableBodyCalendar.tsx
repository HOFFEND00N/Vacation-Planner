import React, { useEffect, useState } from "react";
import moment from "moment";
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
import styles from "./table-body-calendar.module.css";
import { makeStylesForTableBodyCalendarElement } from "./makeStylesForTableBodyCalendarElement";
import { makeStylesForTableTotalElement } from "./makeStylesForTableTotalElement";

type propsType = {
  today: moment.Moment;
  vacationStart: { date: Date; isSelected: boolean };
  vacationEnd: { date: Date; isSelected: boolean };
  handleVacationSelect: (date: Date) => void;
};

export function TableBodyCalendar({ today, vacationStart, vacationEnd, handleVacationSelect }: propsType) {
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
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
    table.push(<div className={styles["table-calendar-row"]}>{makeTableHeaderRow(daysInMonth)}</div>);
    for (let i = 0; i < teamMembers.length; i++) {
      const userVacations = findUserVacations({ vacations, userId: teamMembers[i].id, year: today.year() });
      table.push(
        <div className={styles["table-calendar-row"]}>
          {makeTableBodyRow({ daysInMonth, rowNumber: i + 1, vacations: userVacations, user: teamMembers[i] })}
        </div>
      );
    }
    table.push(<div className={styles["table-calendar-row"]}>{makeTableTotalRow(daysInMonth, vacations)}</div>);
    return table;
  }

  function makeTableHeaderRow(daysInMonth: number) {
    const row: JSX.Element[] = [];
    row.push(
      <div className={`${styles["table-calendar-element"]} ${styles["table-calendar-first-column-element"]}`} />
    );
    row.push(
      <div className={`${styles["table-calendar-element"]} ${styles["table-calendar-element-days-column"]}`}>Days</div>
    );

    for (let j = 1; j < daysInMonth + 1; j++) {
      row.push(<div className={`${styles["table-calendar-element"]}`}>{j}</div>);
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
    const row: JSX.Element[] = [];
    const vacationTypeByDay = getVacationsTypeByDayForCurrentMonth({ vacations, today });
    let isSelectable = false;
    row.push(
      <div className={`${styles["table-calendar-element"]} ${styles["table-calendar-first-column-element"]}`}>
        {teamMembers[rowNumber - 1].name}
      </div>
    );
    row.push(
      <div className={`${styles["table-calendar-element"]} ${styles["table-calendar-element-days-column"]}`}>
        {getTotalVacationsDays(vacations)}
      </div>
    );

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
        />
      );
    }
    return row;
  }

  function makeTableTotalRow(daysInMonth: number, vacations: Vacation[]) {
    const row: JSX.Element[] = [];
    row.push(
      <div className={`${styles["table-calendar-element"]} ${styles["table-calendar-first-column-element"]}`}>
        Total
      </div>
    );

    const vacationsCountByDays: Record<number, number> = {};
    vacations.map((vacation) => {
      const vacationInterval = getVacationIntervalForCurrentMonth({ vacation, today });
      for (let i = vacationInterval.start; i < vacationInterval.end + 1; i++) {
        vacationsCountByDays[i] = (vacationsCountByDays[i] ?? 0) + 1;
      }
    });

    for (let j = 1; j < daysInMonth + 1; j++) {
      const className = makeStylesForTableTotalElement({
        vacationsCount: vacationsCountByDays[j] ?? 0,
        teamMembersCount: teamMembers.length,
        columnNumber: j,
      });
      row.push(<div className={className} />);
    }
    return row;
  }

  if (isDataFetched) {
    return <div>{makeTable()}</div>;
  } else {
    return <h1> Please wait, searching your teammates... </h1>;
  }
}
