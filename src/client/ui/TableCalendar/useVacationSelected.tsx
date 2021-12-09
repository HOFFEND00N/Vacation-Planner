import { useState } from "react";
import { TableCalendarStateType } from "./TableCalendar";

export function useVacationSelected() {
  const [vacationStart, setVacationStart] = useState<TableCalendarStateType>({
    isSelected: false,
  });
  const [vacationEnd, setVacationEnd] = useState<TableCalendarStateType>({
    isSelected: false,
  });

  function handleVacationSelected(date: Date) {
    if (!vacationStart.isSelected) {
      //set end vacation date === start vacation date, because we paint vacation in interval between the two
      setVacationStart({ isSelected: true, date });
      setVacationEnd({ isSelected: false, date });
    } else if (!vacationEnd.isSelected) {
      if (vacationStart.date && date > vacationStart.date) {
        setVacationEnd({ isSelected: true, date });
      } else {
        setVacationStart({ isSelected: true, date });
        setVacationEnd({ isSelected: false, date });
      }
    } else {
      setVacationStart({ isSelected: true, date });
      setVacationEnd({ isSelected: false, date });
    }
  }

  return { vacationStart, vacationEnd, handleVacationSelected };
}
