import React, { useEffect, useState } from "react";
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

export function TableCalendarBody({ today, vacationStart, vacationEnd, handleOnClick }: propsType) {
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  // TODO: useReducer()
  // TODO: refactor to use components
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({ id: "", name: "" });
  useEffect(() => {
    (async () => {
      const { team, currentUser } = await getTeamMembers();
      setTeamMembers(team);
      setCurrentUser(currentUser);
      const vacations = await getVacations(team.map((teamMember) => teamMember.id));
      setVacations(vacations);
      setIsDataFetched(true);
    })();
  }, []);

  if (isDataFetched) {
    const daysInMonth = today.daysInMonth();
    return (
      <div>
        <HeaderRow daysInMonth={daysInMonth} />
        {teamMembers.map((teamMember) => {
          const userVacations = findUserVacations({ vacations, userId: teamMember.id, year: today.year() });
          return (
            <BodyRow
              handleOnClick={handleOnClick}
              daysInMonth={daysInMonth}
              today={today}
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
        <TotalRow today={today} daysInMonth={daysInMonth} vacations={vacations} teamMembersCount={teamMembers.length} />
      </div>
    );
  } else {
    return <h1> Please wait, searching your teammates... </h1>;
  }
}
