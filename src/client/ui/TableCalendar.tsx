import React from "react";
import { TableCalendarHeader } from "./TableHeaderCalendar/TableCalendarHeader";
import { TableBodyCalendar } from "./TableBodyCalendar/TableBodyCalendar";

export function TableCalendar() {
  return (
    <div>
      <TableCalendarHeader />
      <TableBodyCalendar />
    </div>
  );
}
