import React, { useState } from "react";
import { Button } from "@confirmit/react-button";
import moment from "moment";
import { TableCalendarHeader } from "../TableHeaderCalendar/TableCalendarHeader";
import { TableBodyCalendar } from "../TableBodyCalendar/TableBodyCalendar";
import styles from "./table-calendar.module.css";

export function TableCalendar() {
  const [today, setToday] = useState(moment());
  const [vacationStart, setVacationStart] = useState<{ date: Date; isSelected: boolean }>({
    date: new Date(0),
    isSelected: false,
  });
  const [vacationEnd, setVacationEnd] = useState<{ date: Date; isSelected: boolean }>({
    date: new Date(0),
    isSelected: false,
  });

  const handleVacationSelect = (date: Date) => {
    if (!vacationStart.isSelected) {
      //set end vacation date === start vacation date, because we paint vacation in interval between the two
      setVacationStart({ isSelected: true, date });
      setVacationEnd({ isSelected: false, date });
    } else if (!vacationEnd.isSelected) {
      setVacationEnd({ isSelected: true, date });
    } else {
      setVacationStart({ isSelected: true, date });
      setVacationEnd({ isSelected: false, date });
    }
  };

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
      <TableBodyCalendar
        today={today}
        vacationStart={vacationStart}
        vacationEnd={vacationEnd}
        handleVacationSelect={handleVacationSelect}
      />
      <Button
        className={styles["table-calendar-button"]}
        {...(vacationStart.isSelected && vacationEnd.isSelected ? { disabled: false } : { disabled: true })}
      >
        Plan Vacation
      </Button>
    </div>
  );
}
