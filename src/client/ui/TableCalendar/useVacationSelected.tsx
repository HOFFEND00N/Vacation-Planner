import { useState } from "react";
import { Vacation } from "../../../shared";

export type TableCalendarStateType = {
  date?: Date;
  isSelected: boolean;
};

export const useVacationSelected = ({
  initialVacationStart,
  initialVacationEnd,
}: {
  initialVacationStart?: TableCalendarStateType;
  initialVacationEnd?: TableCalendarStateType;
}) => {
  const defaultVacation: TableCalendarStateType = {
    isSelected: false,
  };

  initialVacationStart = !initialVacationStart ? defaultVacation : initialVacationStart;
  initialVacationEnd = !initialVacationEnd ? defaultVacation : initialVacationEnd;

  const [vacationStart, setVacationStart] = useState<TableCalendarStateType>(initialVacationStart);
  const [vacationEnd, setVacationEnd] = useState<TableCalendarStateType>(initialVacationEnd);

  const handleVacationSelected = ({ date, vacations }: { date: Date; vacations: Vacation[] }) => {
    if (!vacationStart.isSelected) {
      setVacationStart({ isSelected: true, date });
      setVacationEnd({ isSelected: false });
    } else if (!vacationEnd.isSelected) {
      if (vacationStart.date && date > vacationStart.date) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (vacations.some((vacation) => vacation.start >= vacationStart.date && vacation.end <= date)) {
          setVacationStart({ isSelected: true, date });
        } else {
          setVacationEnd({ isSelected: true, date });
        }
      } else {
        setVacationStart({ isSelected: true, date });
        setVacationEnd({ isSelected: false });
      }
    } else {
      setVacationStart({ isSelected: true, date });
      setVacationEnd({ isSelected: false });
    }
  };

  return { vacationStart, vacationEnd, handleVacationSelected };
};
