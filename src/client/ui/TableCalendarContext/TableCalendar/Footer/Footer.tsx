import React from "react";
import { Button } from "@confirmit/react-button";
import { useHistory } from "react-router-dom";
import { TableCalendarStateType } from "../TableCalendar";
import { Legend } from "./Legend";
import { SelectedDates } from "./SelectedDates";
import "./footer.css";

export function Footer({
  vacationStart,
  vacationEnd,
}: {
  vacationStart: TableCalendarStateType;
  vacationEnd: TableCalendarStateType;
}) {
  const history = useHistory();

  const handleClick = () => {
    history.push("/plan-vacation");
  };

  return (
    <div className={"footer-container"} data-testid={"footer-container"}>
      <Legend />
      <SelectedDates vacationStart={vacationStart} vacationEnd={vacationEnd} />
      <Button
        className={"footer-container__plan-vacation-button"}
        disabled={!vacationStart.isSelected && !vacationEnd.isSelected}
        data-testid={"plan-vacation-button"}
        onClick={handleClick}
      >
        Plan Vacation
      </Button>
    </div>
  );
}
