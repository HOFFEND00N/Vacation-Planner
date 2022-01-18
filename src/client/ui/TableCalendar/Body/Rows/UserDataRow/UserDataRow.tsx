import React, { useContext } from "react";
import { VacationDataCell } from "../Cells/VacationDataCell";
import { getVacationsTypeByDayForCurrentMonth } from "../../../../../domain/Vacation/getVacationsTypeByDayForCurrentMonth";
import { getTotalVacationsDays } from "../../../../../domain/Vacation/getTotalVacationsDays";
import { TableCalendarStateType } from "../../../useVacationSelected";
import { Row } from "../Row/Row";
import { User, Vacation } from "../../../../../domain/types";
import { TableCalendarContext } from "../../../TableCalendarContext/TableCalendarContext";
import { DaysColumnCell } from "../Cells/DaysColumnCell";
import { Cell } from "../Cells/Cell";
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

    const isSelectable = isCellSelectable({ userId: user.id, currentUserId: currentUser.id });
    const isSelected = isCellSelected({
      vacationStartDate: vacationStart.date,
      vacationEndDate: vacationEnd.date,
      cellDate: elementDate,
      columnNumber: day,
    });

    cells.push(
      <VacationDataCell
        date={elementDate}
        key={day}
        isSelectable={isSelectable}
        isSelected={isSelected}
        vacationType={vacationTypeByDay[day]}
      />
    );
  }
  return (
    <Row dataTestId={`row ${user.id}`}>
      <Cell value={employeeName} />
      <DaysColumnCell value={getTotalVacationsDays(vacations)} />
      {cells}
    </Row>
  );
};
