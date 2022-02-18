import { Vacation } from "../../../../../../shared";

export const isCellSelectable = ({
  userId,
  currentUserId,
  cellDate,
  vacations,
}: {
  userId: string;
  currentUserId: string;
  cellDate: Date;
  vacations: Vacation[];
}) => {
  if (vacations.some((vacation) => cellDate >= vacation.start && cellDate <= vacation.end)) {
    return false;
  }
  return userId === currentUserId;
};
