import React, { useContext } from "react";
import { Cell } from "../Cell";
import { getVacationsTypeByDayForCurrentMonth } from "../../../../../domain/Vacation/getVacationsTypeByDayForCurrentMonth";
import { getTotalVacationsDays } from "../../../../../domain/Vacation/getTotalVacationsDays";
import { TableCalendarStateType } from "../../../useVacationSelected";
import { Row } from "../Row/Row";
import { User, Vacation } from "../../../../../domain/types";
import { TableCalendarContext } from "../../../TableCalendarContext/TableCalendarContext";
import { isCellSelectable } from "./isCellSelectable";
import { isCellSelected } from "./isCellSelected";

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

    const cellSelectable = isCellSelectable({ userId: user.id, currentUserId: currentUser.id });
    const cellSelected = isCellSelected({
      vacationStartDate: vacationStart.date,
      vacationEndDate: vacationEnd.date,
      cellDate: elementDate,
      columnNumber: day,
    });

    cells.push(
      <Cell
        date={elementDate}
        key={day + 1}
        cellSelectable={cellSelectable}
        cellSelected={cellSelected}
        vacationType={vacationTypeByDay[day]}
      />
    );
  }
  return (
    <Row dataTestId={`row ${user.id}`}>
      <Cell value={employeeName} key={0} />
      <Cell value={getTotalVacationsDays(vacations)} isDaysColumn key={1} />
      {cells}
    </Row>
  );
};
