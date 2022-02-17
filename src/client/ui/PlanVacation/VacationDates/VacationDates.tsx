import React, { Dispatch, SetStateAction } from "react";
import { DatePicker } from "@confirmit/react-date-picker";
import moment from "moment";
import "./vacation-dates.css";

export const VacationDates = ({
  vacationStartDate,
  vacationEndDate,
  handleDateStartChange,
  handleDateEndChange,
}: {
  vacationStartDate: moment.Moment;
  vacationEndDate: moment.Moment;
  handleDateStartChange: Dispatch<SetStateAction<moment.Moment | null>>;
  handleDateEndChange: Dispatch<SetStateAction<moment.Moment | null>>;
}) => {
  return (
    <div data-testid="vacation-dates">
      Vacation dates
      <div className="vacation-dates">
        <DatePicker
          date={vacationStartDate}
          onChange={handleDateStartChange}
          className="vacation-dates__item"
          data-testid="start-date-picker"
        />
        <hr className="vacation-dates__line-between" />
        <DatePicker
          date={vacationEndDate}
          onChange={handleDateEndChange}
          className="vacation-dates__item"
          data-testid="end-date-picker"
        />
      </div>
    </div>
  );
};
