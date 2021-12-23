import React from "react";
import { Button } from "@confirmit/react-button";
import { useHistory } from "react-router-dom";
import { TableCalendarStateType } from "../useVacationSelected";
import { Legend } from "./Legend";
import { SelectedDates } from "./SelectedDates";
import "./footer.css";

export const Footer = ({
  vacationStart,
  vacationEnd,
}: {
  vacationStart: TableCalendarStateType;
  vacationEnd: TableCalendarStateType;
}) => {
  const history = useHistory();

  const handleClick = () => {
    history.push({
      pathname: "/plan-vacation",
      state: { vacationStart: vacationStart, vacationEnd: vacationEnd.isSelected ? vacationEnd : vacationStart },
    });
  };

  return (
    <div className="footer-container" data-testid="footer-container">
      <Legend />
      <SelectedDates vacationStart={vacationStart} vacationEnd={vacationEnd} />
      <Button
        className="footer-container__plan-vacation-button"
        disabled={!vacationStart.isSelected && !vacationEnd.isSelected}
        data-testid="plan-vacation-button"
        onClick={handleClick}
      >
        Plan Vacation
      </Button>
    </div>
  );
};
