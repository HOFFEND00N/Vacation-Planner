import React from "react";
import moment from "moment";
import { IconButton } from "@confirmit/react-button";
import { Icon, chevronLeft, chevronRight } from "@confirmit/react-icons";
import "./pager.css";
import { makePagerName } from "./makePagerName";

export function Pager({
  handlePreviousMonthChange,
  handleNextMonthChange,
  today,
}: {
  handlePreviousMonthChange: () => void;
  handleNextMonthChange: () => void;
  today: moment.Moment;
}) {
  return (
    <div className={"pager"} data-testid={"pager"}>
      <IconButton
        className={"table-calendar-controls"}
        onClick={handlePreviousMonthChange}
        data-testid={"table-calendar-controls-previous-month-change"}
      >
        <Icon path={chevronLeft} />
      </IconButton>

      <div className={"pager-current-date"}>{makePagerName(today)}</div>

      <IconButton
        className={"table-calendar-controls"}
        onClick={handleNextMonthChange}
        data-testid={"table-calendar-controls-next-month-change"}
      >
        <Icon path={chevronRight} />
      </IconButton>
    </div>
  );
}
