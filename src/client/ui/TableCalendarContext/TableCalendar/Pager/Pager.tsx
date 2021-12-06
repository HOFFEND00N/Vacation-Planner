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
        className={"pager__controls"}
        onClick={handlePreviousMonthChange}
        data-testid={"pager__controls-previous-month-change"}
      >
        <Icon path={chevronLeft} />
      </IconButton>

      <div className={"pager__current-date"}>{makePagerName(today)}</div>

      <IconButton
        className={"pager__controls"}
        onClick={handleNextMonthChange}
        data-testid={"pager__controls-next-month-change"}
      >
        <Icon path={chevronRight} />
      </IconButton>
    </div>
  );
}
