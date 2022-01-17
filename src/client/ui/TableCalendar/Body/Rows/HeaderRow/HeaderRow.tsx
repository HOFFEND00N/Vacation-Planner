import React from "react";
import { Row } from "../Row/Row";
import { Cell } from "../Cells/Cell";
import { DaysColumnCell } from "../Cells/DaysColumnCell";

export const HeaderRow = ({ daysInMonth }: { daysInMonth: number }) => {
  const cells: JSX.Element[] = [];
  for (let j = 1; j < daysInMonth + 1; j++) {
    cells.push(<Cell value={j} key={j} />);
  }
  return (
    <Row dataTestId="table-calendar-header-row">
      <Cell key={0} />
      <DaysColumnCell value="Days" />
      {cells}
    </Row>
  );
};
