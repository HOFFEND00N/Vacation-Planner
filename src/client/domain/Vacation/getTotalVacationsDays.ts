import { Vacation } from "../../../shared";
import { getDateDifferenceInDays } from "./getDateDifferenceInDays";

export const getTotalVacationsDays = (vacations: Vacation[]) => {
  return vacations.reduce((totalVacationDays, currentVacation) => {
    totalVacationDays += getDateDifferenceInDays({ start: currentVacation.start, end: currentVacation.end });
    return totalVacationDays;
  }, 0);
};
