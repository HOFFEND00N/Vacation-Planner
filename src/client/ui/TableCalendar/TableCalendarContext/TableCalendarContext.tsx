import React from "react";

export const TableCalendarContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleOnClick: (date: Date) => {
    // will be updated in table calendar component
  },
});