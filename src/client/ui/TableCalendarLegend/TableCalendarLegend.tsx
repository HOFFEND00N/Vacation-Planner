import React from "react";
import { TableCalendarLegendItem } from "../TableCalendarLegendItem/TableCalendarLegendItem";
import styles from "./table-calendar-legend.css";

export function TableCalendarLegend() {
  return (
    <div className={styles["table-calendar-legend-container"]}>
      <TableCalendarLegendItem
        className={"table-calendar-legend-element-vacation-approved"}
        itemName={"Vacation approved"}
      />
      <TableCalendarLegendItem
        className={"table-calendar-legend-element-vacation-pending-approval"}
        itemName={"Vacation pending approval"}
      />
      <TableCalendarLegendItem className={"table-calendar-legend-element-selected"} itemName={"Day selected"} />
      <TableCalendarLegendItem
        className={"table-calendar-legend-total-element-weak-workload"}
        itemName={"Weak workload"}
      />
      <TableCalendarLegendItem
        className={"table-calendar-legend-total-element-medium-workload"}
        itemName={"Medium workload"}
      />
      <TableCalendarLegendItem
        className={"table-calendar-legend-total-element-heavy-workload"}
        itemName={"Heavy workload"}
      />
    </div>
  );
}
