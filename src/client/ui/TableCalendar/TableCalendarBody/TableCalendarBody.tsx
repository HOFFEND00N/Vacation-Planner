import React, { useEffect, useReducer } from "react";
import moment from "moment";
import { getTeamMembers } from "../../../application/getTeamMembers";
import { getVacations } from "../../../application/getVacations";
import { User } from "../../../domain/user";
import { findUserVacations, Vacation } from "../../../domain/vacation";
import { BodyRow } from "./Row/BodyRow/BodyRow";
import { HeaderRow } from "./Row/HeaderRow/HeaderRow";
import { TotalRow } from "./Row/TotalRow/TotalRow";

type propsType = {
  today: moment.Moment;
  vacationStart: { date: Date; isSelected: boolean };
  vacationEnd: { date: Date; isSelected: boolean };
  handleOnClick: (date: Date) => void;
};

type stateType = {
  isDataFetched: boolean;
  teamMembers: User[];
  currentUser: User;
  vacations: Vacation[];
};

type actionType = stateType & { type: string };

export function TableCalendarBody({ today, vacationStart, vacationEnd, handleOnClick }: propsType) {
  const initialState: stateType = {
    isDataFetched: false,
    teamMembers: [],
    currentUser: { id: "", name: "" },
    vacations: [],
  };

  const reducer = (state: stateType, action: actionType): stateType => {
    switch (action.type) {
      case "set state": {
        return {
          isDataFetched: true,
          teamMembers: action.teamMembers,
          currentUser: action.currentUser,
          vacations: action.vacations,
        };
      }
      default: {
        throw new Error();
      }
    }
  };

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
      <div>
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
