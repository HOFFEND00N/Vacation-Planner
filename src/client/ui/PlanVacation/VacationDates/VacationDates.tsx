import React from "react";
import "./vacation-dates.css";

export const VacationDates = ({
  vacationStartDate,
  vacationEndDate,
}: {
  vacationStartDate: Date;
  vacationEndDate: Date;
}) => {
  return (
    <div data-testid="vacation-dates">
      Vacation dates
      <div className="vacation-dates">
        {vacationStartDate.toDateString()}
        <hr className="vacation-dates__line-between" />
        {vacationEndDate.toDateString()}
      </div>
    </div>
  );
};
