import React, { Dispatch, SetStateAction, useContext, useEffect, useReducer } from "react";
import { getTeamMembers } from "../../../application/getTeamMembers";
import { getVacations } from "../../../application/getVacations";
import { TableCalendarStateType } from "../useVacationSelected";
import { findUserVacations } from "../../../domain/Vacation/findUserVacations";
import { TableCalendarContext } from "../TableCalendarContext/TableCalendarContext";
import { UserDataRow } from "./Row/UserDataRow";
import { HeaderRow } from "./Row/HeaderRow";
import { TotalRow } from "./Row/TotalRow";
import { bodyReducerInitialState, loadData, reducer } from "./reducer";

type propsType = {
  vacationStart: TableCalendarStateType;
  vacationEnd: TableCalendarStateType;
  setErrorMessage: Dispatch<SetStateAction<string | undefined>>;
};

export function Body({ vacationStart, vacationEnd, setErrorMessage }: propsType) {
  const [{ isDataFetched, currentUser, teamMembers, vacations }, dispatch] = useReducer(
    reducer,
    bodyReducerInitialState
  );
  const tableCalendarContext = useContext(TableCalendarContext);

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

  if (!isDataFetched) {
    return <h1> Please wait, searching your teammates... </h1>;
  }

  const daysInMonth = tableCalendarContext.currentTableCalendarDate.daysInMonth();
  return (
    <div data-testid={"table-calendar-body"}>
      <HeaderRow daysInMonth={daysInMonth} />
      {teamMembers.map((teamMember) => {
        const userVacations = findUserVacations({
          vacations: vacations,
          userId: teamMember.id,
          year: tableCalendarContext.currentTableCalendarDate.year(),
        });
        return (
          <UserDataRow
            daysInMonth={daysInMonth}
            vacationStart={vacationStart}
            vacationEnd={vacationEnd}
            currentUser={currentUser}
            vacations={userVacations}
            employeeName={teamMember.name}
            user={teamMember}
            key={teamMember.id}
          />
        );
      })}
      <TotalRow daysInMonth={daysInMonth} vacations={vacations} teamMembersCount={teamMembers.length} />
    </div>
  );
}
