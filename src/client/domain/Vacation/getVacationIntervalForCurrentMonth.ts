import { Moment } from "moment";
import { VacationInterval } from "../../types";
import { Vacation } from "../../../sharedKernel";

//6 variants of vacation dates in case of month: prev/current, current/current, current/next, prev/next.
// prev/prev, next/next - dont care about this cases.
export const getVacationIntervalForCurrentMonth = ({
  vacation,
  currentTableCalendarDate,
}: {
  vacation: Vacation;
  currentTableCalendarDate: Moment;
}) => {
  const vacationInterval: VacationInterval = { start: -1, end: -1 };
  const isVacationInCurrentYear =
    vacation.start.getFullYear() === currentTableCalendarDate.year() &&
    vacation.end.getFullYear() === currentTableCalendarDate.year();

  const isVacationEndInCurrentMonth = vacation.end.getMonth() === currentTableCalendarDate.month();
  const isVacationStartInCurrentMonth = vacation.start.getMonth() === currentTableCalendarDate.month();
  const isVacationStartInPreviousMonths = vacation.start.getMonth() < currentTableCalendarDate.month();
  const isVacationEndInNextMonths = vacation.end.getMonth() > currentTableCalendarDate.month();

  if (isVacationInCurrentYear) {
    if (isVacationStartInPreviousMonths && isVacationEndInCurrentMonth) {
      vacationInterval.start = 1;
      vacationInterval.end = vacation.end.getDate();
    }
    if (isVacationStartInCurrentMonth && isVacationEndInCurrentMonth) {
      vacationInterval.start = vacation.start.getDate();
      vacationInterval.end = vacation.end.getDate();
    }
    if (isVacationStartInCurrentMonth && isVacationEndInNextMonths) {
      vacationInterval.start = vacation.start.getDate();
      vacationInterval.end = currentTableCalendarDate.daysInMonth();
    }
    if (isVacationStartInPreviousMonths && isVacationEndInNextMonths) {
      vacationInterval.start = 1;
      vacationInterval.end = currentTableCalendarDate.daysInMonth();
    }
  }
  return vacationInterval;
};
