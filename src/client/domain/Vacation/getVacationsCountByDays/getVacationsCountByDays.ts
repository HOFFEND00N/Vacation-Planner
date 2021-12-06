import moment from "moment";
import { getVacationIntervalForCurrentMonth } from "../getVacationIntervalForCurrentMonth/getVacationIntervalForCurrentMonth";
import { Vacation, VacationCountByDays } from "../vacation";

export function getVacationsCountByDays({ vacations, today }: { vacations: Vacation[]; today: moment.Moment }) {
  const vacationsCountByDays: VacationCountByDays = {};
  vacations.map((vacation) => {
    const vacationInterval = getVacationIntervalForCurrentMonth({ vacation, today });
    for (let i = vacationInterval.start; i < vacationInterval.end + 1; i++) {
      vacationsCountByDays[i] = (vacationsCountByDays[i] ?? 0) + 1;
    }
  });
  return vacationsCountByDays;
}
