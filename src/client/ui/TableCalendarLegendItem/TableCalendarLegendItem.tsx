import React from "react";
import styles from "./table-calendar-legend-item.css";

type tableCalendarLegendItemProps = {
  className: string;
  itemName: string;
};

export function TableCalendarLegendItem({ className, itemName }: tableCalendarLegendItemProps) {
  return (
    <div className={styles["table-calendar-legend-element-container"]}>
      <div className={`${styles["table-calendar-legend-element"]} ${className}`} />
      <div> {itemName} </div>
    </div>
  );
}
