import { Moment } from "moment";
import { Vacation } from "../../domain/vacation";
import { VacationTypeByDay } from "../../types";
import { getVacationIntervalForCurrentMonth } from "./getVacationIntervalForCurrentMonth";

export function getVacationsTypeByDayForCurrentMonth({ vacations, today }: { vacations: Vacation[]; today: Moment }) {
  const vacationTypeByDay: VacationTypeByDay = {};

  vacations.map((vacation) => {
    const vacationInterval = getVacationIntervalForCurrentMonth({ vacation, today });

    for (let i = vacationInterval.start; i < vacationInterval.end + 1; i++) {
      vacationTypeByDay[i] = vacation.type;
    }
    return vacationTypeByDay;
  });

  return vacationTypeByDay;
}
