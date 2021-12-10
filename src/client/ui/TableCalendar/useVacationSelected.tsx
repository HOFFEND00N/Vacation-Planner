import { useState } from "react";
import { TableCalendarStateType } from "./TableCalendar";

export function useVacationSelected() {
  const [vacationStart, setVacationStart] = useState<TableCalendarStateType>({
    isSelected: false,
    date: undefined,
  });
  const [vacationEnd, setVacationEnd] = useState<TableCalendarStateType>({
    isSelected: false,
    date: undefined,
  });

  function handleVacationSelected(date: Date) {
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
  }

  return { vacationStart, vacationEnd, handleVacationSelected };
}
