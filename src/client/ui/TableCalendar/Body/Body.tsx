import React, { useContext } from "react";
import { TableCalendarStateType } from "../useVacationSelected";
import { findUserVacations } from "../../../domain/Vacation/findUserVacations";
import { TableCalendarContext } from "../TableCalendarContext/TableCalendarContext";
import { User, Vacation } from "../../../../shared";
import { UserDataRow, HeaderRow, TotalRow } from "./Rows";

type propsType = {
  vacationStart: TableCalendarStateType;
  vacationEnd: TableCalendarStateType;
  teamMembers: User[];
  currentUser: User;
  vacations: Vacation[];
};

export const Body = ({ vacationStart, vacationEnd, currentUser, teamMembers, vacations }: propsType) => {
  const { currentTableCalendarDate } = useContext(TableCalendarContext);

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
            userVacations={userVacations}
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
