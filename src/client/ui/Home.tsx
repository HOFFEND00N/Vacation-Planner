import React from "react";
import UncontrollableCalendar from "@confirmit/react-calendar";
import { Popover } from "@confirmit/react-popover";
import styles from "./calendarDay.module.css";
import { CurrentUser } from "./CurrentUser";
//controllable vs uncontrollable
export function Home() {
  return (
    <>
      <CurrentUser />
      <UncontrollableCalendar
        renderDayContent={({ day }) => (
          <Popover content={"No planned vacations"}>
            <div className={styles["calendar-day"]}>{day.date()}</div>
          </Popover>
        )}
      />
    </>
  );
}
