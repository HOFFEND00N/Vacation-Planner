import React, { useState } from "react";
import moment from "moment";
import { TableCalendarContext } from "./TableCalendarContext/TableCalendarContext";
import { Pager } from "./Pager";
import { Body } from "./Body";
import "./table-calendar.css";
import { Footer } from "./Footer";
import { useVacationSelected } from "./useVacationSelected";

export const TableCalendar = ({ currentDate }: { currentDate: moment.Moment }) => {
  const [currentTableCalendarDate, setCurrentTableCalendarDate] = useState(currentDate);
  const { vacationStart, vacationEnd, handleVacationSelected } = useVacationSelected();

  const handlePreviousMonthChange = () => {
    setCurrentTableCalendarDate(currentTableCalendarDate.clone().subtract(1, "months"));
  };

  const handleNextMonthChange = () => {
    setCurrentTableCalendarDate(currentTableCalendarDate.clone().add(1, "months"));
  };

  return (
    <div className="table-calendar" data-testid="table-calendar">
      <TableCalendarContext.Provider value={{ handleClick: handleVacationSelected, currentTableCalendarDate }}>
        <Pager handlePreviousMonthChange={handlePreviousMonthChange} handleNextMonthChange={handleNextMonthChange} />
        <Body vacationStart={vacationStart} vacationEnd={vacationEnd} />
      </TableCalendarContext.Provider>
      <Footer vacationStart={vacationStart} vacationEnd={vacationEnd} />
    </div>
  );
};
