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
  if (vacationStart.isSelected && vacationStart.date) {
    selectedDates = vacationStart.date.toDateString();
  }
  if (vacationEnd.isSelected && vacationEnd.date) {
    selectedDates = `${selectedDates} - ${vacationEnd.date.toDateString()}`;
  }
  return <div data-testid={"selected-dates"}>{selectedDates}</div>;
}
