import { Vacation } from "../../../shared";

export const findUserVacations = ({
  vacations,
  userId,
  year,
}: {
  vacations: Vacation[];
  userId: string;
  year: number;
}) => {
  return vacations.filter(
    (vacation) =>
      vacation.userId === userId && year === vacation.start.getFullYear() && year === vacation.end.getFullYear()
  );
};
