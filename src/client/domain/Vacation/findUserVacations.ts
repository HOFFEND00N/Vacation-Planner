import { Vacation } from "./vacation";

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
