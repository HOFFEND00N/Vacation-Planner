import React from "react";
import moment from "moment";
import { IconButton } from "@confirmit/react-button";
import { Icon, chevronLeft, chevronRight } from "@confirmit/react-icons";
import styles from "./table-calendar-pager.module.css";

export function TableCalendarPager({
  handlePreviousMonthChange,
  handleNextMonthChange,
  today,
}: {
  handlePreviousMonthChange: () => void;
  handleNextMonthChange: () => void;
  today: moment.Moment;
}) {
  function makeCalendarHeader() {
    return `${today.format("MMMM")} ${today.year()}`;
  }

  return (
    <div className={styles["table-calendar-pager"]} data-testid={"table-calendar-pager"}>
      <IconButton
        className={styles["table-calendar-controls"]}
        onClick={handlePreviousMonthChange}
        data-testid={"table-calendar-controls-previous-month-change"}
      >
        <Icon path={chevronLeft} />
      </IconButton>

      <div className={styles["table-calendar-pager-current-date"]}>{makeCalendarHeader()}</div>

      <IconButton
        className={styles["table-calendar-controls"]}
        onClick={handleNextMonthChange}
        data-testid={"table-calendar-controls-next-month-change"}
      >
        <Icon path={chevronRight} />
      </IconButton>
    </div>
  );
}
