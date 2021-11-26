import React, { useEffect, useState } from "react";
import moment from "moment";
import { getTeamMembers } from "../../application/getTeamMembers";
import { getVacations } from "../../application/getVacations";
import { User } from "../../domain/user";
import { findUserVacations, Vacation } from "../../domain/vacation";
import { Row } from "./Row/Row";
import { makeTableHeaderRowCells } from "./Row/makeTableHeaderRowCells";
import { makeTableBodyRowCells } from "./Row/makeTableBodyRowCells";
import { makeTableTotalRowCells } from "./Row/makeTableTotalRowCells";

type propsType = {
  today: moment.Moment;
  vacationStart: { date: Date; isSelected: boolean };
  vacationEnd: { date: Date; isSelected: boolean };
  handleVacationSelect: (date: Date) => void;
};

export function TableBodyCalendar({ today, vacationStart, vacationEnd, handleVacationSelect }: propsType) {
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

  function makeTable() {
    const table: JSX.Element[] = [];
    const daysInMonth = today.daysInMonth();
    table.push(<Row cells={makeTableHeaderRowCells(daysInMonth)} />);
    for (let i = 0; i < teamMembers.length; i++) {
      const userVacations = findUserVacations({ vacations, userId: teamMembers[i].id, year: today.year() });
      table.push(
        <Row
          cells={makeTableBodyRowCells({
            daysInMonth,
            rowNumber: i + 1,
            vacations: userVacations,
            user: teamMembers[i],
            teamMembers,
            vacationStart,
            vacationEnd,
            currentUser,
            today,
            handleOnClick: handleVacationSelect,
          })}
        />
      );
    }
    table.push(<Row cells={makeTableTotalRowCells({ daysInMonth, vacations, teamMembers, today })} />);
    return table;
  }

  if (isDataFetched) {
    return <div>{makeTable()}</div>;
  } else {
    return <h1> Please wait, searching your teammates... </h1>;
  }
}
