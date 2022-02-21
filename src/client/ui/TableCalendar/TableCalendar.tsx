import React, { useEffect, useReducer, useState } from "react";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { getVacations } from "../../application/getVacations";
import { showError } from "../bannerHelpers/showError";
import { getTeamMembers } from "../../application/getTeamMembers";
import { findUserVacations } from "../../domain/Vacation/findUserVacations";
import { TableCalendarContext } from "./TableCalendarContext/TableCalendarContext";
import { Pager } from "./Pager";
import { Body } from "./Body";
import "./table-calendar.css";
import { Footer } from "./Footer";
import { useVacationSelected } from "./useVacationSelected";
import { errorOccurred, reducer, userDataLoaded } from "./Body/reducer";

export const TableCalendar = ({ currentDate }: { currentDate: moment.Moment }) => {
  const [currentTableCalendarDate, setCurrentTableCalendarDate] = useState(currentDate);
  const location = useLocation();
  const selectedVacationStart = location.state?.vacationStart;
  const selectedVacationEnd = location.state?.vacationEnd;
  const { vacationStart, vacationEnd, handleVacationSelected } = useVacationSelected({
    initialVacationStart: selectedVacationStart,
    initialVacationEnd: selectedVacationEnd,
  });
  const [{ error, currentUser, teamMembers, vacations }, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    (async () => {
      try {
        const { teamMembers, currentUser } = await getTeamMembers();
        const vacations = await getVacations(teamMembers.map((teamMember) => teamMember.id));
        dispatch(userDataLoaded({ teamMembers, currentUser, vacations }));
      } catch (error) {
        dispatch(errorOccurred(error));
        showError(error);
      }
    })();
  }, []);

  if (error) {
    return <h1> No data </h1>;
  }

  if (!currentUser || !vacations || !teamMembers) {
    return <h1> Please wait, searching your teammates... </h1>;
  }

  const handlePreviousMonthChange = () => {
    setCurrentTableCalendarDate(currentTableCalendarDate.clone().subtract(1, "months"));
  };

  const handleNextMonthChange = () => {
    setCurrentTableCalendarDate(currentTableCalendarDate.clone().add(1, "months"));
  };

  return (
    <div className="table-calendar" data-testid="table-calendar">
      <TableCalendarContext.Provider
        value={{
          handleClick: handleVacationSelected,
          currentTableCalendarDate,
          vacations: findUserVacations({
            vacations,
            userId: currentUser.id,
            year: currentTableCalendarDate.year(),
          }),
        }}
      >
        <Pager handlePreviousMonthChange={handlePreviousMonthChange} handleNextMonthChange={handleNextMonthChange} />
        <Body
          vacationStart={vacationStart}
          vacationEnd={vacationEnd}
          currentUser={currentUser}
          vacations={vacations}
          teamMembers={teamMembers}
        />
      </TableCalendarContext.Provider>
      <Footer vacationStart={vacationStart} vacationEnd={vacationEnd} />
    </div>
  );
};
