import moment, { Moment } from "moment";
import { VacationInterval, VacationTypeByDay } from "../types";

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

export function findUserVacations({
  vacations,
  userId,
  year,
}: {
  vacations: Vacation[];
  userId: string;
  year: number;
}) {
  return vacations.filter((vacation) => {
    return vacation.userId === userId && year === vacation.start.getFullYear() && year === vacation.end.getFullYear();
  });
}

export function getTotalVacationsDays(vacations: Vacation[]) {
  return vacations.reduce((totalVacationDays, currentVacation) => {
    totalVacationDays += getDateDifferenceInDays({ start: currentVacation.start, end: currentVacation.end });
    return totalVacationDays;
  }, 0);
}

export function getDateDifferenceInDays({ start, end }: { start: Date; end: Date }) {
  return moment(end).diff(moment(start), "day") + 1;
}

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

//6 variants of vacation dates in case of month: prev/current, current/current, current/next, prev/next.
// prev/prev, next/next - dont care about this cases.
export function getVacationIntervalForCurrentMonth({ vacation, today }: { vacation: Vacation; today: Moment }) {
  const vacationInterval: VacationInterval = { start: -1, end: -1 };
  if (vacation.start.getFullYear() === today.year() && vacation.end.getFullYear() === today.year()) {
    if (vacation.start.getMonth() < today.month() && vacation.end.getMonth() === today.month()) {
      vacationInterval.start = 1;
      vacationInterval.end = vacation.end.getDate();
    } else if (vacation.start.getMonth() === today.month() && vacation.end.getMonth() === today.month()) {
      vacationInterval.start = vacation.start.getDate();
      vacationInterval.end = vacation.end.getDate();
    } else if (vacation.start.getMonth() === today.month() && vacation.end.getMonth() > today.month()) {
      vacationInterval.start = vacation.start.getDate();
      vacationInterval.end = today.daysInMonth();
    } else if (vacation.start.getMonth() < today.month() && vacation.end.getMonth() > today.month()) {
      vacationInterval.start = 1;
      vacationInterval.end = today.daysInMonth();
    }
  }
  return vacationInterval;
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
