import { useState } from "react";

export type TableCalendarStateType = {
  date?: Date;
  isSelected: boolean;
};

export const useVacationSelected = () => {
  const [vacationStart, setVacationStart] = useState<TableCalendarStateType>({
    isSelected: false,
  });
  const [vacationEnd, setVacationEnd] = useState<TableCalendarStateType>({
    isSelected: false,
  });

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
