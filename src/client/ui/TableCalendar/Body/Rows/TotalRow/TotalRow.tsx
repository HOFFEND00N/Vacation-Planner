import React, { useContext } from "react";
import "./total-row.css";
import { Cell } from "../Cell";
import { getVacationsCountByDays } from "../../../../../domain/Vacation/getVacationsCountByDays";
import { Row } from "../Row/Row";
import { Vacation } from "../../../../../domain/types";
import { TableCalendarContext } from "../../../TableCalendarContext/TableCalendarContext";
import { makeStylesForTableTotalElement } from "./makeStylesForTableTotalElement";
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
    const classNames = makeStylesForTableTotalElement(dayWorkloadType);
    cells.push(<Cell classNames={classNames} key={j} />);
  }
  return (
    <Row dataTestId={"table-calendar-total-row"}>
      <Cell value={"Total"} key={0} />
      {cells}
    </Row>
  );
};
