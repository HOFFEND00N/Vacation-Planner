import React, { useEffect, useReducer } from "react";
import moment from "moment";
import { getTeamMembers } from "../../../application/getTeamMembers";
import { getVacations } from "../../../application/getVacations";
import { findUserVacations } from "../../../domain/vacation";
import { BodyRow } from "./Row/BodyRow/BodyRow";
import { HeaderRow } from "./Row/HeaderRow/HeaderRow";
import { TotalRow } from "./Row/TotalRow/TotalRow";
import { initialState, reducer } from "./reducer";

type propsType = {
  today: moment.Moment;
  vacationStart: { date: Date; isSelected: boolean };
  vacationEnd: { date: Date; isSelected: boolean };
  handleOnClick: (date: Date) => void;
};

export function TableCalendarBody({ today, vacationStart, vacationEnd, handleOnClick }: propsType) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    (async () => {
      const { teamMembers, currentUser } = await getTeamMembers();
      const vacations = await getVacations(teamMembers.map((teamMember) => teamMember.id));
      dispatch({ isDataFetched: true, teamMembers, currentUser, vacations, type: "set state" });
    })();
  }, []);

  if (state.isDataFetched) {
    const daysInMonth = today.daysInMonth();
    return (
      <div data-testid={"table-calendar-body"}>
        <HeaderRow daysInMonth={daysInMonth} />
        {state.teamMembers.map((teamMember) => {
          const userVacations = findUserVacations({
            vacations: state.vacations,
            userId: teamMember.id,
            year: today.year(),
          });
          return (
            <BodyRow
              handleOnClick={handleOnClick}
              daysInMonth={daysInMonth}
              today={today}
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
          today={today}
          daysInMonth={daysInMonth}
          vacations={state.vacations}
          teamMembersCount={state.teamMembers.length}
        />
      </div>
    );
  } else {
    return <h1> Please wait, searching your teammates... </h1>;
  }
}
