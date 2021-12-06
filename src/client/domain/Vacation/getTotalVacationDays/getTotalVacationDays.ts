import { Vacation } from "../vacation";
import { getDateDifferenceInDays } from "../getDateDifferenceInDays";

export function getTotalVacationsDays(vacations: Vacation[]) {
  return vacations.reduce((totalVacationDays, currentVacation) => {
    totalVacationDays += getDateDifferenceInDays({ start: currentVacation.start, end: currentVacation.end });
    return totalVacationDays;
  }, 0);
}
