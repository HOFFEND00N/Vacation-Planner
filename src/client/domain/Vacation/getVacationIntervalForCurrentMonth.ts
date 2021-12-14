import { Moment } from "moment";
import { VacationInterval } from "../../types";
import { Vacation } from "../types";

//6 variants of vacation dates in case of month: prev/current, current/current, current/next, prev/next.
// prev/prev, next/next - dont care about this cases.
export function getVacationIntervalForCurrentMonth({
  vacation,
  currentTableCalendarDate,
}: {
  vacation: Vacation;
  currentTableCalendarDate: Moment;
}) {
  const vacationInterval: VacationInterval = { start: -1, end: -1 };
  if (
    vacation.start.getFullYear() === currentTableCalendarDate.year() &&
    vacation.end.getFullYear() === currentTableCalendarDate.year()
  ) {
    if (
      vacation.start.getMonth() < currentTableCalendarDate.month() &&
      vacation.end.getMonth() === currentTableCalendarDate.month()
    ) {
      vacationInterval.start = 1;
      vacationInterval.end = vacation.end.getDate();
    } else if (
      vacation.start.getMonth() === currentTableCalendarDate.month() &&
      vacation.end.getMonth() === currentTableCalendarDate.month()
    ) {
      vacationInterval.start = vacation.start.getDate();
      vacationInterval.end = vacation.end.getDate();
    } else if (
      vacation.start.getMonth() === currentTableCalendarDate.month() &&
      vacation.end.getMonth() > currentTableCalendarDate.month()
    ) {
      vacationInterval.start = vacation.start.getDate();
      vacationInterval.end = currentTableCalendarDate.daysInMonth();
    } else if (
      vacation.start.getMonth() < currentTableCalendarDate.month() &&
      vacation.end.getMonth() > currentTableCalendarDate.month()
    ) {
      vacationInterval.start = 1;
      vacationInterval.end = currentTableCalendarDate.daysInMonth();
    }
  }
  return vacationInterval;
}
