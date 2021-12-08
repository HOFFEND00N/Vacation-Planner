import moment from "moment";
import { getVacationIntervalForCurrentMonth } from "./getVacationIntervalForCurrentMonth";
import { Vacation, VacationCountByDays } from "./vacation";

export function getVacationsCountByDays({
  vacations,
  currentTableCalendarDate,
}: {
  vacations: Vacation[];
  currentTableCalendarDate: moment.Moment;
}) {
  const vacationsCountByDays: VacationCountByDays = {};
  vacations.map((vacation) => {
    const vacationInterval = getVacationIntervalForCurrentMonth({
      vacation,
      currentTableCalendarDate: currentTableCalendarDate,
    });
    for (let i = vacationInterval.start; i < vacationInterval.end + 1; i++) {
      vacationsCountByDays[i] = (vacationsCountByDays[i] ?? 0) + 1;
    }
  });
  return vacationsCountByDays;
}
