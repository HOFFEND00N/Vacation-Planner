import React, { Dispatch, SetStateAction } from "react";
import { DatePicker } from "@confirmit/react-date-picker";
import moment from "moment";
import "./vacation-dates.css";

export function VacationDates({
  vacationStartDate,
  vacationEndDate,
  handleDateStartChange,
  handleDateEndChange,
}: {
  vacationStartDate: moment.Moment | null;
  vacationEndDate: moment.Moment | null;
  handleDateStartChange: Dispatch<SetStateAction<moment.Moment | null>>;
  handleDateEndChange: Dispatch<SetStateAction<moment.Moment | null>>;
}) {
  return (
    <div>
      Vacation dates
      <div className="vacation-dates">
        <DatePicker date={vacationStartDate} onChange={handleDateStartChange} className="vacation-dates__item" />
        <hr className="vacation-dates__line-between" />
        <DatePicker date={vacationEndDate} onChange={handleDateEndChange} className="vacation-dates__item" />
      </div>
    </div>
  );
}
