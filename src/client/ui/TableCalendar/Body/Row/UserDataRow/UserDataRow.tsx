import React, { useContext } from "react";
import { Cell } from "../Cell";
import "./user-data-row.css";
import { getVacationsTypeByDayForCurrentMonth } from "../../../../../domain/Vacation/getVacationsTypeByDayForCurrentMonth";
import { getTotalVacationsDays } from "../../../../../domain/Vacation/getTotalVacationsDays";
import { TableCalendarStateType } from "../../../useVacationSelected";
import { Row } from "../Row";
import { User, Vacation } from "../../../../../domain/types";
import { TableCalendarContext } from "../../../TableCalendarContext/TableCalendarContext";
import { makeStylesForUserDataRowElement } from "./makeStylesForUserDataRowElement";

export const UserDataRow = ({
  daysInMonth,
  vacations,
  user,
  vacationStart,
  vacationEnd,
  currentUser,
  employeeName,
}: {
  daysInMonth: number;
  vacations: Vacation[];
  user: User;
  vacationStart: TableCalendarStateType;
  vacationEnd: TableCalendarStateType;
  currentUser: User;
  employeeName: string;
}) => {
  const tableCalendarContext = useContext(TableCalendarContext);

  const cells: JSX.Element[] = [];
  const vacationTypeByDay = getVacationsTypeByDayForCurrentMonth({
    vacations,
    currentTableCalendarDate: tableCalendarContext.currentTableCalendarDate,
  });
  for (let day = 1; day < daysInMonth + 1; day++) {
    const elementDate = new Date(
      tableCalendarContext.currentTableCalendarDate.year(),
      tableCalendarContext.currentTableCalendarDate.month(),
      day
    );
    const classNames = makeStylesForUserDataRowElement({
      vacationStartDate: vacationStart.date,
      vacationEndDate: vacationEnd.date,
      cellDate: elementDate,
      columnNumber: day,
      userId: user.id,
      currentUserId: currentUser.id,
      vacationType: vacationTypeByDay[day],
    });
    cells.push(
      <Cell
        value={""}
        classNames={classNames}
        date={user.id === currentUser.id ? elementDate : undefined}
        key={day + 1}
      />
    );
  }
  return (
    <Row dataTestId={`row ${user.id}`}>
      <Cell value={employeeName} key={0} />
      <Cell value={getTotalVacationsDays(vacations)} isDaysColumn={true} key={1} />
      {cells}
    </Row>
  );
};
