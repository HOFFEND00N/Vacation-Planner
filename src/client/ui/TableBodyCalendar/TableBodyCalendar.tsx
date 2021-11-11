import React, { useEffect, useState } from "react";
import moment from "moment";
import { getTeamMembers } from "../../application/getTeamMembers";
import styles from "./table-body-calendar.module.css";

export function TableBodyCalendar({ today }: { today: moment.Moment }) {
  const [teamMembers, setTeamMembers] = useState<string[]>([""]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    (async () => {
      const team = await getTeamMembers();
      setIsDataFetched(true);
      setTeamMembers(team);
    })();
  }, []);

  function makeTable() {
    const table: JSX.Element[] = [];
    const daysInMonth = today.daysInMonth();
    for (let i = 0; i < teamMembers.length + 1; i++) {
      table.push(<div className={styles["table-calendar-row"]}>{makeRow(daysInMonth, i)}</div>);
    }
    return table;
  }

  function makeRow(daysInMonth: number, rowNumber: number) {
    const row: JSX.Element[] = [];
    for (let j = 0; j < daysInMonth + 1; j++) {
      row.push(
        <div
          className={`${styles["table-calendar-element"]} ${
            j === 0 ? styles["table-calendar-first-column-element"] : ""
          }`}
        >
          {rowNumber === 0 ? makeTableHeaderElementContent(j) : makeTableBodyElementContent(rowNumber, j)}
        </div>
      );
    }
    return row;
  }

  function makeTableHeaderElementContent(columnNumber: number) {
    return columnNumber === 0 ? "" : columnNumber;
  }

  function makeTableBodyElementContent(rowNumber: number, columnNumber: number) {
    return columnNumber === 0 ? teamMembers[rowNumber - 1] : "";
  }

  if (isDataFetched) {
    return <div>{makeTable()}</div>;
  } else {
    return <h1> Please wait, searching your teammates... </h1>;
  }
}
