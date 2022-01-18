import React from "react";
import { Cell } from "../Cell";
import "./days-column-cell.css";

export const DaysColumnCell = ({ value }: { value: number | string }) => {
  return <Cell classNames="cell-days-column" value={value} />;
};
