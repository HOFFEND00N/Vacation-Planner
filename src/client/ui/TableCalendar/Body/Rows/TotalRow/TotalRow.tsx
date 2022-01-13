import React, { useContext } from "react";
import { getVacationsCountByDays } from "../../../../../domain/Vacation/getVacationsCountByDays";
import { Row } from "../Row/Row";
import { Vacation } from "../../../../../domain/types";
import { TableCalendarContext } from "../../../TableCalendarContext/TableCalendarContext";
import { TotalCell } from "../Cells/TotalCell";
import { getDayWorkloadType } from "./getDayWorkloadType";

type TotalRowProps = {
  vacations: Vacation[];
  daysInMonth: number;
  teamMembersCount: number;
};

export const TotalRow = ({ vacations, daysInMonth, teamMembersCount }: TotalRowProps) => {
  const tableCalendarContext = useContext(TableCalendarContext);
  const vacationsCountByDays = getVacationsCountByDays({
    vacations,
    currentTableCalendarDate: tableCalendarContext.currentTableCalendarDate,
  });
  const cells: JSX.Element[] = [];
  for (let j = 1; j < daysInMonth + 1; j++) {
    const dayWorkloadType = getDayWorkloadType({
      vacationsCount: vacationsCountByDays[j] ?? 0,
      teamMembersCount,
    });
    cells.push(<TotalCell key={j} workloadType={dayWorkloadType} />);
  }
  return (
    <Row dataTestId="table-calendar-total-row">
      <TotalCell value="Total" key={0} />
      {cells}
    </Row>
  );
};
