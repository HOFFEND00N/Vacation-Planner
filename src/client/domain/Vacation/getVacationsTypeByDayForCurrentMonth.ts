import { Moment } from "moment";
import { VacationTypeByDay } from "../../types";
import { Vacation } from "../../../shared";
import { getVacationIntervalForCurrentMonth } from "./getVacationIntervalForCurrentMonth";

export const getVacationsTypeByDayForCurrentMonth = ({
  vacations,
  currentTableCalendarDate,
}: {
  vacations: Vacation[];
  currentTableCalendarDate: Moment;
}) => {
  const vacationTypeByDay: VacationTypeByDay = {};

  vacations.forEach((vacation) => {
    const vacationInterval = getVacationIntervalForCurrentMonth({
      vacation,
      currentTableCalendarDate,
    });

    for (let i = vacationInterval.start; i < vacationInterval.end + 1; i++) {
      vacationTypeByDay[i] = vacation.type;
    }
    return vacationTypeByDay;
  });

  return vacationTypeByDay;
};
