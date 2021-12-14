import { Moment } from "moment";
import { VacationTypeByDay } from "../../types";
import { Vacation } from "../types";
import { getVacationIntervalForCurrentMonth } from "./getVacationIntervalForCurrentMonth";

export function getVacationsTypeByDayForCurrentMonth({
  vacations,
  currentTableCalendarDate,
}: {
  vacations: Vacation[];
  currentTableCalendarDate: Moment;
}) {
  const vacationTypeByDay: VacationTypeByDay = {};

  vacations.map((vacation) => {
    const vacationInterval = getVacationIntervalForCurrentMonth({
      vacation,
      currentTableCalendarDate: currentTableCalendarDate,
    });

    for (let i = vacationInterval.start; i < vacationInterval.end + 1; i++) {
      vacationTypeByDay[i] = vacation.type;
    }
    return vacationTypeByDay;
  });

  return vacationTypeByDay;
}
