import React from "react";
import { TableCalendarLegendItem } from "../TableCalendarLegendItem/TableCalendarLegendItem";
import styles from "./table-calendar-legend.css";

export function TableCalendarLegend() {
  const legendItemsValues = [
    { className: "table-calendar-legend-element-vacation-approved", itemName: "Vacation approved" },
    { className: "table-calendar-legend-element-vacation-pending-approval", itemName: "Vacation pending approval" },
    { className: "table-calendar-legend-element-selected", itemName: "Day selected" },
    { className: "table-calendar-legend-total-element-weak-workload", itemName: "Weak workload" },
    { className: "table-calendar-legend-total-element-medium-workload", itemName: "Medium workload" },
    { className: "table-calendar-legend-total-element-heavy-workload", itemName: "Heavy workload" },
  ];
  const LegendItems = legendItemsValues.map((legendItemsValue) => (
    <TableCalendarLegendItem className={legendItemsValue.className} itemName={legendItemsValue.itemName} />
  ));
  return (
    <div className={styles["table-calendar-legend-container"]} data-testid={"table-calendar-legend-container"}>
      {" "}
      {LegendItems}{" "}
    </div>
  );
}
