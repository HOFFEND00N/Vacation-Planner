import moment from "moment";
import { getVacationIntervalForCurrentMonth } from "./getVacationIntervalForCurrentMonth/getVacationIntervalForCurrentMonth.test";

export type Vacation = {
  id: string;
  start: Date;
  end: Date;
  userId: string;
  type: VacationType;
};

export enum VacationType {
  APPROVED = "Approved",
  PENDING_APPROVAL = "Pending approval",
}

export function getVacationsCountByDays({ vacations, today }: { vacations: Vacation[]; today: moment.Moment }) {
  const vacationsCountByDays: Record<number, number> = {};
  vacations.map((vacation) => {
    const vacationInterval = getVacationIntervalForCurrentMonth({ vacation, today });
    for (let i = vacationInterval.start; i < vacationInterval.end + 1; i++) {
      vacationsCountByDays[i] = (vacationsCountByDays[i] ?? 0) + 1;
    }
  });
  return vacationsCountByDays;
}
