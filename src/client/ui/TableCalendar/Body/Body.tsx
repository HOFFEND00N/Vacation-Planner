import React, { useContext, useEffect, useReducer } from "react";
import { store } from "@confirmit/react-banner";
import { getTeamMembers } from "../../../application/getTeamMembers";
import { getVacations } from "../../../application/getVacations";
import { TableCalendarStateType } from "../useVacationSelected";
import { findUserVacations } from "../../../domain/Vacation/findUserVacations";
import { TableCalendarContext } from "../TableCalendarContext/TableCalendarContext";
import { UserDataRow, HeaderRow, TotalRow } from "./Rows";
import { setUserData, reducer, setError } from "./reducer";

type propsType = {
  vacationStart: TableCalendarStateType;
  vacationEnd: TableCalendarStateType;
};

export const Body = ({ vacationStart, vacationEnd }: propsType) => {
  const [{ error, currentUser, teamMembers, vacations }, dispatch] = useReducer(reducer, {});
  const { currentTableCalendarDate } = useContext(TableCalendarContext);

  useEffect(() => {
    (async () => {
      try {
        const { teamMembers, currentUser } = await getTeamMembers();
        const vacations = await getVacations(teamMembers.map((teamMember) => teamMember.id));
        dispatch(setUserData({ teamMembers, currentUser, vacations }));
      } catch (error) {
        dispatch(setError({ error }));
      }
    })();
  }, []);

  const showError = (error: Error) => {
    store.error({ text: error.message, closeTimeout: 0 });
  };

  if (error) {
    showError(error);
    return <h1> No data </h1>;
  }

  if (!currentUser || !vacations || !teamMembers) {
    return <h1> Please wait, searching your teammates... </h1>;
  }

  const daysInMonth = currentTableCalendarDate.daysInMonth();
  return (
    <div data-testid="table-calendar-body">
      <HeaderRow daysInMonth={daysInMonth} />
      {teamMembers.map((teamMember) => {
        const userVacations = findUserVacations({
          vacations,
          userId: teamMember.id,
          year: currentTableCalendarDate.year(),
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
};
