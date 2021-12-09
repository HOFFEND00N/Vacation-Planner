import React, { Dispatch, SetStateAction, useEffect, useReducer } from "react";
import moment from "moment";
import { getTeamMembers } from "../../../application/getTeamMembers";
import { getVacations } from "../../../application/getVacations";
import { TableCalendarStateType } from "../TableCalendar";
import { findUserVacations } from "../../../domain/Vacation/findUserVacations";
import { UserDataRow } from "./Row/UserDataRow";
import { HeaderRow } from "./Row/HeaderRow";
import { TotalRow } from "./Row/TotalRow";
import { bodyReducerInitialState, loadData, reducer } from "./reducer";

type propsType = {
  currentTableCalendarDate: moment.Moment;
  vacationStart: TableCalendarStateType;
  vacationEnd: TableCalendarStateType;
  setErrorMessage: Dispatch<SetStateAction<string | undefined>>;
};

export function Body({ currentTableCalendarDate, vacationStart, vacationEnd, setErrorMessage }: propsType) {
  const [state, dispatch] = useReducer(reducer, bodyReducerInitialState);
  useEffect(() => {
    (async () => {
      try {
        const { teamMembers, currentUser } = await getTeamMembers();
        const vacations = await getVacations(teamMembers.map((teamMember) => teamMember.id));
        dispatch(loadData({ isDataFetched: true, teamMembers, currentUser, vacations }));
      } catch (error) {
        setErrorMessage(error.message);
      }
    })();
  }, []);

  if (!state.isDataFetched) {
    return <h1> Please wait, searching your teammates... </h1>;
  }

  const daysInMonth = currentTableCalendarDate.daysInMonth();
  return (
    <div data-testid={"table-calendar-body"}>
      <HeaderRow daysInMonth={daysInMonth} />
      {state.teamMembers.map((teamMember) => {
        const userVacations = findUserVacations({
          vacations: state.vacations,
          userId: teamMember.id,
          year: currentTableCalendarDate.year(),
        });
        return (
          <UserDataRow
            daysInMonth={daysInMonth}
            currentTableCalendarDate={currentTableCalendarDate}
            vacationStart={vacationStart}
            vacationEnd={vacationEnd}
            currentUser={state.currentUser}
            vacations={userVacations}
            employeeName={teamMember.name}
            user={teamMember}
            key={teamMember.id}
          />
        );
      })}
      <TotalRow
        currentTableCalendarDate={currentTableCalendarDate}
        daysInMonth={daysInMonth}
        vacations={state.vacations}
        teamMembersCount={state.teamMembers.length}
      />
    </div>
  );
}
