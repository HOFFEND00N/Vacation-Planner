import React from "react";
import cn from "classnames";
import styles from "../../table-calendar-body.module.css";
import { Cell } from "../Cell/Cell";

export function HeaderRow({ daysInMonth }: { daysInMonth: number }) {
  const cells: JSX.Element[] = [];
  for (let j = 1; j < daysInMonth + 1; j++) {
    cells.push(<Cell value={j} className={styles["table-calendar-element"]} />);
  }
  return (
    <div className={styles["table-calendar-row"]}>
      <Cell
        value={""}
        className={cn(styles["table-calendar-element"], styles["table-calendar-first-column-element"])}
      />
      <Cell
        value={"Days"}
        className={cn(styles["table-calendar-element"], styles["table-calendar-element-days-column"])}
      />
      {cells}
    </div>
  );
}
