import React from "react";
import styles from "./table-calendar-legend.css";

export function TableCalendarLegend() {
  return (
    <div className={"table-calendar-legend-container"}>
      <div> Calendar legend: </div>
      <div className={styles["table-calendar-legend-element-container"]}>
        <div
          className={`${styles["table-calendar-legend-element"]} ${styles["table-calendar-legend-element-vacation-approved"]}`}
        />
        <div> Vacation approved </div>
      </div>
      <div className={styles["table-calendar-legend-element-container"]}>
        <div
          className={`${styles["table-calendar-legend-element"]} ${styles["table-calendar-legend-element-vacation-pending-approval"]}`}
        />
        <div> Vacation pending approval </div>
      </div>
      <div className={styles["table-calendar-legend-element-container"]}>
        <div
          className={`${styles["table-calendar-legend-element"]} ${styles["table-calendar-legend-element-selected"]}`}
        />
        <div> Day selected </div>
      </div>
      <div className={styles["table-calendar-legend-element-container"]}>
        <div
          className={`${styles["table-calendar-legend-element"]} ${styles["table-calendar-legend-total-element-weak-workload"]}`}
        />
        <div> Weak workload </div>
      </div>
      <div className={styles["table-calendar-legend-element-container"]}>
        <div
          className={`${styles["table-calendar-legend-element"]} ${styles["table-calendar-legend-total-element-medium-workload"]}`}
        />
        <div> Medium workload </div>
      </div>
      <div className={styles["table-calendar-legend-element-container"]}>
        <div
          className={`${styles["table-calendar-legend-element"]} ${styles["table-calendar-legend-total-element-heavy-workload"]}`}
        />
        <div> Heavy workload </div>
      </div>
    </div>
  );
}
