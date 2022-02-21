import React from "react";
import moment from "moment";
import { Vacation } from "../../../../shared";

interface ITableCalendarContext {
  handleClick: ({ date, vacations }: { date: Date; vacations: Vacation[] }) => void;
  currentTableCalendarDate: moment.Moment;
  vacations: Vacation[];
}

export const TableCalendarContext = React.createContext<ITableCalendarContext>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleClick: ({ date, vacations }) => {
    // will be updated in table calendar component
  },
  currentTableCalendarDate: moment(),
  vacations: [],
});
