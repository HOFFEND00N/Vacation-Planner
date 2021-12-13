import { useState } from "react";

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

  const handleVacationSelected = (date: Date) => {
    if (!vacationStart.isSelected) {
      setVacationStart({ isSelected: true, date });
      setVacationEnd({ isSelected: false });
    } else if (!vacationEnd.isSelected) {
      if (vacationStart.date && date > vacationStart.date) {
        setVacationEnd({ isSelected: true, date });
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
