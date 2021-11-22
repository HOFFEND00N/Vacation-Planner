import { Moment } from "moment";
import { Vacation } from "../../domain/vacation";

export function getVacationsForCurrentMonth({ vacations, today }: { vacations: Vacation[]; today: Moment }) {
  const vacationTypeByDay = {};

  vacations.map((vacation) => {
    //6 variants of vacation dates in case of month: prev/current, current/current, current/next, prev/next.
    // prev/prev, next/next - dont care about this cases.
    let start = -1,
      end = -1;
    if (vacation.start.getFullYear() === today.year() && vacation.end.getFullYear() === today.year()) {
      if (vacation.start.getMonth() < today.month() && vacation.end.getMonth() === today.month()) {
        start = 1;
        end = vacation.end.getDate();
      } else if (vacation.start.getMonth() === today.month() && vacation.end.getMonth() === today.month()) {
        start = vacation.start.getDate();
        end = vacation.end.getDate();
      } else if (vacation.start.getMonth() === today.month() && vacation.end.getMonth() > today.month()) {
        start = vacation.start.getDate();
        end = today.daysInMonth();
      } else if (vacation.start.getMonth() < today.month() && vacation.end.getMonth() > today.month()) {
        start = 1;
        end = today.daysInMonth();
      }
    }

    for (let i = start; i < end + 1; i++) {
      vacationTypeByDay[i] = vacation.type;
    }
    return vacationTypeByDay;
  });

  return vacationTypeByDay;
}
