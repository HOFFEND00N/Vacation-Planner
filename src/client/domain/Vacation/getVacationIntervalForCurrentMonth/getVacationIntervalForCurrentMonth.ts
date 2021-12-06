import { Moment } from "moment";
import { VacationInterval } from "../../../types";
import { Vacation } from "../vacation";

//6 variants of vacation dates in case of month: prev/current, current/current, current/next, prev/next.
// prev/prev, next/next - dont care about this cases.
export function getVacationIntervalForCurrentMonth({ vacation, today }: { vacation: Vacation; today: Moment }) {
  const vacationInterval: VacationInterval = { start: -1, end: -1 };
  if (vacation.start.getFullYear() === today.year() && vacation.end.getFullYear() === today.year()) {
    if (vacation.start.getMonth() < today.month() && vacation.end.getMonth() === today.month()) {
      vacationInterval.start = 1;
      vacationInterval.end = vacation.end.getDate();
    } else if (vacation.start.getMonth() === today.month() && vacation.end.getMonth() === today.month()) {
      vacationInterval.start = vacation.start.getDate();
      vacationInterval.end = vacation.end.getDate();
    } else if (vacation.start.getMonth() === today.month() && vacation.end.getMonth() > today.month()) {
      vacationInterval.start = vacation.start.getDate();
      vacationInterval.end = today.daysInMonth();
    } else if (vacation.start.getMonth() < today.month() && vacation.end.getMonth() > today.month()) {
      vacationInterval.start = 1;
      vacationInterval.end = today.daysInMonth();
    }
  }
  return vacationInterval;
}
