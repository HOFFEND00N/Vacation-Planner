import React, { useState } from "react";
import { Button } from "@confirmit/react-button";
import moment from "moment";
import { TableCalendarContext } from "../TableCalendarContext";
import { TableCalendarPager } from "./TableCalendarPager/TableCalendarPager";
import { TableCalendarBody } from "./TableCalendarBody/TableCalendarBody";
import { TableCalendarLegend } from "./TableCalendarLegend/TableCalendarLegend";
import styles from "./table-calendar.module.css";

export function TableCalendar({ currentDate }: { currentDate: moment.Moment }) {
  const [today, setToday] = useState(currentDate);
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
    <div className={styles["table-calendar-container"]} data-testid={"table-calendar-container"}>
      <TableCalendarPager
        handlePreviousMonthChange={handlePreviousMonthChange}
        handleNextMonthChange={handleNextMonthChange}
        today={today}
      />
      <TableCalendarContext.Provider value={{ handleOnClick: handleVacationSelect }}>
        <TableCalendarBody today={today} vacationStart={vacationStart} vacationEnd={vacationEnd} />
      </TableCalendarContext.Provider>

      <div className={styles["table-calendar-legend-and-button-container"]}>
        <TableCalendarLegend />
        <Button
          className={styles["table-calendar-button"]}
          disabled={!vacationStart.isSelected && !vacationEnd.isSelected}
          data-testid={"plan-vacation-button"}
        >
          Plan Vacation
        </Button>
      </div>
    </div>
  );
}
