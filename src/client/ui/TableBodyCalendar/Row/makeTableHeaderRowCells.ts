import cn from "classnames";
import { Cell } from "../../../domain/cell";
import styles from "../table-body-calendar.module.css";

export function makeTableHeaderRowCells(daysInMonth: number): Cell[] {
  const row: Cell[] = [];
  row.push({
    value: "",
    classNames: cn(styles["table-calendar-element"], styles["table-calendar-first-column-element"]),
  });
  row.push({
    value: "Days",
    classNames: cn(styles["table-calendar-element"], styles["table-calendar-element-days-column"]),
  });

  for (let j = 1; j < daysInMonth + 1; j++) {
    row.push({
      value: j,
      classNames: styles["table-calendar-element"],
    });
  }
  return row;
}
