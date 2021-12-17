import React from "react";
import { Moment } from "moment";
import "./total-row.css";
import { Cell } from "../Cell";
import { getVacationsCountByDays } from "../../../../../domain/Vacation/getVacationsCountByDays";
import { Row } from "../Row";
import { Vacation } from "../../../../../domain/types";
import { makeStylesForTableTotalElement } from "./makeStylesForTableTotalElement";
import { calculateDayWorkloadPercentage } from "./calculateDayWorkloadPercentage";

type TotalRowProps = {
  vacations: Vacation[];
  currentTableCalendarDate: Moment;
  daysInMonth: number;
  teamMembersCount: number;
};

export function TotalRow({ vacations, currentTableCalendarDate, daysInMonth, teamMembersCount }: TotalRowProps) {
  const vacationsCountByDays = getVacationsCountByDays({
    vacations,
    currentTableCalendarDate: currentTableCalendarDate,
  });
  const cells: JSX.Element[] = [];
  for (let j = 1; j < daysInMonth + 1; j++) {
    const dayWorkloadPercentage = calculateDayWorkloadPercentage({
      vacationsCount: vacationsCountByDays[j] ?? 0,
      teamMembersCount,
    });
    const classNames = makeStylesForTableTotalElement(dayWorkloadPercentage);
    cells.push(<Cell value={""} classNames={classNames} key={j} />);
  }
  return (
    <Row dataTestId={"table-calendar-total-row"}>
      <Cell value={"Total"} key={0} />
      {cells}
    </Row>
  );
}
