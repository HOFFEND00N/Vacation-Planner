import React from "react";
import styles from "../table-body-calendar.module.css";
import { Cell } from "../../../domain/cell";

export function Row({ cells }: { cells: Cell[] }) {
  return (
    <div className={styles["table-calendar-row"]}>
      {cells.map((cell) => (
        <div className={cell.classNames} onClick={cell.onClick}>
          {cell.value}
        </div>
      ))}
    </div>
  );
}
