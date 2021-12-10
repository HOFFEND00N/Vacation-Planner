import React from "react";
import "../../body.css";
import { Cell } from "../Cell";
import { Row } from "../Row";

export function HeaderRow({ daysInMonth }: { daysInMonth: number }) {
  const cells: JSX.Element[] = [];
  for (let j = 1; j < daysInMonth + 1; j++) {
    cells.push(<Cell value={j} key={j + 1} />);
  }
  return (
    <Row dataTestId={"table-calendar-header-row"}>
      <Cell value={""} key={0} />
      <Cell value={"Days"} classNames={"cell-days-column"} key={1} />
      {cells}
    </Row>
  );
}
