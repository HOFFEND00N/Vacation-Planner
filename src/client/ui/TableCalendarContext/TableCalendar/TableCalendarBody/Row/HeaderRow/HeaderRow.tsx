import React from "react";
import cn from "classnames";
import styles from "../../body.module.css";
import { Cell } from "../Cell/Cell";

export function HeaderRow({ daysInMonth }: { daysInMonth: number }) {
  const cells: JSX.Element[] = [];
  for (let j = 1; j < daysInMonth + 1; j++) {
    cells.push(<Cell value={j} className={styles["row__cell"]} key={j + 1} />);
  }
  return (
    <div className={styles["row"]} data-testid={"table-calendar-header-row"}>
      <Cell value={""} className={cn(styles["row__cell"], styles["row__first-column-cell"])} key={0} />
      <Cell value={"Days"} className={cn(styles["row__cell"], styles["row__cell-days-column"])} key={1} />
      {cells}
    </div>
  );
}
