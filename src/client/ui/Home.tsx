import React from "react";
import moment from "moment";
import { TableCalendar } from "./TableCalendar/TableCalendar";

export function Home() {
  return <TableCalendar currentDate={moment()} />;
}
