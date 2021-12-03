import React from "react";
import { TableCalendarStateType } from "../../TableCalendar";

export function SelectedDates({
  vacationStart,
  vacationEnd,
}: {
  vacationStart: TableCalendarStateType;
  vacationEnd: TableCalendarStateType;
}) {
  let selectedDates = "";
  if (vacationStart.isSelected) {
    selectedDates = vacationStart.date.toDateString();
  }
  if (vacationEnd.isSelected) {
    selectedDates = `${selectedDates} - ${vacationEnd.date.toDateString()}`;
  }
  return <div data-testid={"selected-dates"}>{selectedDates}</div>;
}
