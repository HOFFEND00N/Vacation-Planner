import React from "react";
import { Button } from "@confirmit/react-button";
import { TableCalendarHeader } from "../TableHeaderCalendar/TableCalendarHeader";
import { TableBodyCalendar } from "../TableBodyCalendar/TableBodyCalendar";
import styles from "./table-calendar.module.css";

export function TableCalendar() {
  return (
    <div className={styles["table-calendar-container"]}>
      <TableCalendarHeader />
      <TableBodyCalendar />
      <Button>Plan Vacation</Button>
    </div>
  );
}
