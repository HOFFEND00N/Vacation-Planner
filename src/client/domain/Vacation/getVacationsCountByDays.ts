import moment from "moment";
import { VacationCountByDays } from "../types";
import { Vacation } from "../../../shared";
import { getVacationIntervalForCurrentMonth } from "./getVacationIntervalForCurrentMonth";

export const getVacationsCountByDays = ({
  vacations,
  currentTableCalendarDate,
}: {
  vacations: Vacation[];
  currentTableCalendarDate: moment.Moment;
}) => {
  const vacationsCountByDays: VacationCountByDays = {};
  vacations.forEach((vacation) => {
    const vacationInterval = getVacationIntervalForCurrentMonth({
      vacation,
      currentTableCalendarDate,
    });
    for (let i = vacationInterval.start; i < vacationInterval.end + 1; i++) {
      vacationsCountByDays[i] = (vacationsCountByDays[i] ?? 0) + 1;
    }
  });
  return vacationsCountByDays;
};
