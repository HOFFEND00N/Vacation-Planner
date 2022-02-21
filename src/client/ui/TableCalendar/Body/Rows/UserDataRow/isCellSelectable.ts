import { VacationTypeByDay } from "../../../../../types";

export const isCellSelectable = ({
  userId,
  currentUserId,
  vacationTypeByDay,
  day,
}: {
  userId: string;
  currentUserId: string;
  vacationTypeByDay: VacationTypeByDay;
  day: number;
}) => {
  return userId === currentUserId && !vacationTypeByDay[day];
};
