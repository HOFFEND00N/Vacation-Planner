import React, { useContext } from "react";
import { VacationDataCell } from "../Cells/VacationDataCell";
import { getVacationsTypeByDayForCurrentMonth } from "../../../../../domain/Vacation/getVacationsTypeByDayForCurrentMonth";
import { getTotalVacationsDays } from "../../../../../domain/Vacation/getTotalVacationsDays";
import { TableCalendarStateType } from "../../../useVacationSelected";
import { Row } from "../Row/Row";
import { TableCalendarContext } from "../../../TableCalendarContext/TableCalendarContext";
import { DaysColumnCell } from "../Cells/DaysColumnCell";
import { Cell } from "../Cells/Cell";
import { User, Vacation } from "../../../../../../shared";
import { isCellSelectable } from "./isCellSelectable";
import { isCellSelected } from "./isCellSelected";

export const UserDataRow = ({
  daysInMonth,
  userVacations,
  user,
  vacationStart,
  vacationEnd,
  currentUser,
  employeeName,
}: {
  daysInMonth: number;
  userVacations: Vacation[];
  user: User;
  vacationStart: TableCalendarStateType;
  vacationEnd: TableCalendarStateType;
  currentUser: User;
  employeeName: string;
}) => {
  const tableCalendarContext = useContext(TableCalendarContext);

  const cells: JSX.Element[] = [];
  const vacationTypeByDay = getVacationsTypeByDayForCurrentMonth({
    vacations: userVacations,
    currentTableCalendarDate: tableCalendarContext.currentTableCalendarDate,
  });
  for (let day = 1; day < daysInMonth + 1; day++) {
    const elementDate = new Date(
      tableCalendarContext.currentTableCalendarDate.year(),
      tableCalendarContext.currentTableCalendarDate.month(),
      day
    );

    const isSelectable = isCellSelectable({
      userId: user.id,
      currentUserId: currentUser.id,
      vacationTypeByDay,
      day,
    });
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
      <DaysColumnCell value={getTotalVacationsDays(userVacations)} />
      {cells}
    </Row>
  );
};
