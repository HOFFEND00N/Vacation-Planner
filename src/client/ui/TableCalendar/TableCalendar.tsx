import React, { useState } from "react";
import { Button } from "@confirmit/react-button";
import moment from "moment";
import { TableCalendarHeader } from "../TableHeaderCalendar/TableCalendarHeader";
import { TableBodyCalendar } from "../TableBodyCalendar/TableBodyCalendar";
import styles from "./table-calendar.module.css";

export function TableCalendar() {
  const [today, setToday] = useState(moment());

  function handlePreviousMonthChange() {
    setToday(today.clone().subtract(1, "months"));
  }

  function handleNextMonthChange() {
    setToday(today.clone().add(1, "months"));
  }

  return (
    <div className={styles["table-calendar-container"]}>
      <TableCalendarHeader
        handlePreviousMonthChange={handlePreviousMonthChange}
        handleNextMonthChange={handleNextMonthChange}
        today={today}
      />
      <TableBodyCalendar today={today} />
      <Button className={styles["table-calendar-button"]}>Plan Vacation</Button>
    </div>
  );
}
