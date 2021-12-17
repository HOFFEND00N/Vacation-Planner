import React, { useContext } from "react";
import { IconButton } from "@confirmit/react-button";
import { Icon, chevronLeft, chevronRight } from "@confirmit/react-icons";
import "./pager.css";
import { TableCalendarContext } from "../TableCalendarContext/TableCalendarContext";
import { makePagerName } from "./makePagerName";

export const Pager = ({
  handlePreviousMonthChange,
  handleNextMonthChange,
}: {
  handlePreviousMonthChange: () => void;
  handleNextMonthChange: () => void;
}) => {
  const tableCalendarContext = useContext(TableCalendarContext);

  return (
    <div className="pager" data-testid={"pager"}>
      <IconButton
        className="pager__controls"
        onClick={handlePreviousMonthChange}
        data-testid={"pager__controls-previous-month-change"}
      >
        <Icon path={chevronLeft} />
      </IconButton>

      <div className="pager__current-date">{makePagerName(tableCalendarContext.currentTableCalendarDate)}</div>

      <IconButton
        className="pager__controls"
        onClick={handleNextMonthChange}
        data-testid={"pager__controls-next-month-change"}
      >
        <Icon path={chevronRight} />
      </IconButton>
    </div>
  );
};
