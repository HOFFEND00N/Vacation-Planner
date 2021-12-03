import React from "react";
import { TableCalendarLegendItem } from "./TableCalendarLegendItem/TableCalendarLegendItem";
import styles from "./legend.css";

export function TableCalendarLegend() {
  const legendItemsValues = [
    { className: "legend-item__vacation-approved", itemName: "Vacation approved" },
    { className: "legend-item__vacation-pending-approval", itemName: "Vacation pending approval" },
    { className: "legend-item__selected", itemName: "Day selected" },
    { className: "legend-item__total__weak-workload", itemName: "Weak workload" },
    { className: "legend-item__total__medium-workload", itemName: "Medium workload" },
    { className: "legend-item__total__heavy-workload", itemName: "Heavy workload" },
  ];
  return (
    <div className={styles["legend-container"]} data-testid={"legend-container"}>
      {legendItemsValues.map((legendItemsValue, index) => (
        <TableCalendarLegendItem
          className={legendItemsValue.className}
          itemName={legendItemsValue.itemName}
          key={index}
        />
      ))}
    </div>
  );
}
