import React, { useState } from "react";
import moment from "moment";
import { TableCalendarContext } from "./TableCalendarContext/TableCalendarContext";
import { Pager } from "./Pager";
import { Body } from "./Body";
import "./table-calendar.css";
import { Footer } from "./Footer";
import { useVacationSelected } from "./useVacationSelected";

export type TableCalendarStateType = {
  date?: Date;
  isSelected: boolean;
};

export function TableCalendar({ currentDate }: { currentDate: moment.Moment }) {
  const [currentTableCalendarDate, setCurrentTableCalendarDate] = useState(currentDate);
  const { vacationStart, vacationEnd, handleVacationSelected } = useVacationSelected();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  function handlePreviousMonthChange() {
    setCurrentTableCalendarDate(currentTableCalendarDate.clone().subtract(1, "months"));
  }

  function handleNextMonthChange() {
    setCurrentTableCalendarDate(currentTableCalendarDate.clone().add(1, "months"));
  }

  if (errorMessage) {
    return <h1>Something went wrong... Please try again later.</h1>;
  }

  return (
    <div className={"table-calendar-container"} data-testid={"table-calendar-container"}>
      <Pager
        handlePreviousMonthChange={handlePreviousMonthChange}
        handleNextMonthChange={handleNextMonthChange}
        currentTableCalendarDate={currentTableCalendarDate}
      />
      <TableCalendarContext.Provider value={{ handleClick: handleVacationSelected }}>
        <Body
          currentTableCalendarDate={currentTableCalendarDate}
          vacationStart={vacationStart}
          vacationEnd={vacationEnd}
          setErrorMessage={setErrorMessage}
        />
      </TableCalendarContext.Provider>
      <Footer vacationStart={vacationStart} vacationEnd={vacationEnd} />
    </div>
  );
}
