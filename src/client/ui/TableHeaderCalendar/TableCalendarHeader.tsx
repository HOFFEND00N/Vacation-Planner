import React from "react";
import moment from "moment";
import styles from "./table-calendar-header.module.css";

export function TableCalendarHeader() {
  function makeCalendarHeader() {
    const today = moment();
    return `${today.format("MMMM")} ${today.year()}`;
  }

  return (
    <div className={styles["table-calendar-header"]}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgba(18, 24, 33, 0.6)">
        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
      </svg>
      {makeCalendarHeader()}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgba(18, 24, 33, 0.6)">
        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
      </svg>
    </div>
  );
}
