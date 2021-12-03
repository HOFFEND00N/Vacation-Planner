import React from "react";
import { Button } from "@confirmit/react-button";
import { TableCalendarStateType } from "../TableCalendar";
import "./footer.css";
import { Legend } from "./Legend";
import { SelectedDates } from "./SelectedDates";

export function Footer({
  vacationStart,
  vacationEnd,
}: {
  vacationStart: TableCalendarStateType;
  vacationEnd: TableCalendarStateType;
}) {
  return (
    <div className={"footer-container"} data-testid={"footer-container"}>
      <Legend />
      <SelectedDates vacationStart={vacationStart} vacationEnd={vacationEnd} />
      <Button
        className={"footer-container__button"}
        disabled={!vacationStart.isSelected && !vacationEnd.isSelected}
        data-testid={"plan-vacation-button"}
      >
        Plan Vacation
      </Button>
    </div>
  );
}
