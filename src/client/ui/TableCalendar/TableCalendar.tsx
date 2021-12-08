import React, { useState } from "react";
import moment from "moment";
import { TableCalendarContext } from "./TableCalendarContext/TableCalendarContext";
import { Pager } from "./Pager";
import { Body } from "./Body";
import "./table-calendar.css";
import { Footer } from "./Footer";

export type TableCalendarStateType = {
  date: Date;
  isSelected: boolean;
};

export function TableCalendar({ currentDate }: { currentDate: moment.Moment }) {
  const [today, setToday] = useState(currentDate);
  const [vacationStart, setVacationStart] = useState<TableCalendarStateType>({
    date: new Date(0),
    isSelected: false,
  });
  const [vacationEnd, setVacationEnd] = useState<TableCalendarStateType>({
    date: new Date(0),
    isSelected: false,
  });

  const handleVacationSelect = (date: Date) => {
    if (!vacationStart.isSelected) {
      //set end vacation date === start vacation date, because we paint vacation in interval between the two
      setVacationStart({ isSelected: true, date });
      setVacationEnd({ isSelected: false, date });
    } else if (!vacationEnd.isSelected) {
      if (date > vacationStart.date) {
        setVacationEnd({ isSelected: true, date });
      } else {
        setVacationStart({ isSelected: true, date });
        setVacationEnd({ isSelected: false, date });
      }
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
    <div className={"table-calendar-container"} data-testid={"table-calendar-container"}>
      <Pager
        handlePreviousMonthChange={handlePreviousMonthChange}
        handleNextMonthChange={handleNextMonthChange}
        today={today}
      />
      <TableCalendarContext.Provider value={{ handleOnClick: handleVacationSelect }}>
        <Body today={today} vacationStart={vacationStart} vacationEnd={vacationEnd} />
      </TableCalendarContext.Provider>
      <Footer vacationStart={vacationStart} vacationEnd={vacationEnd} />
    </div>
  );
}
