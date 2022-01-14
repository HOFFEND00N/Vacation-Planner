import { Switch, Route } from "react-router-dom";
import React from "react";
import moment from "moment";
import { ThemeContext, theme } from "@confirmit/react-themes";
import Banner from "@confirmit/react-banner";
import { PlanVacation } from "../PlanVacation/PlanVacation";
import { TableCalendar } from "../TableCalendar";
import "./app.css";

export const App = () => {
  return (
    <ThemeContext.Provider value={theme.themeNames.material}>
      <Banner />
      <Switch>
        <Route path="/plan-vacation">
          <PlanVacation />
        </Route>
        <Route path="/">
          <TableCalendar currentDate={moment()} />
        </Route>
      </Switch>
    </ThemeContext.Provider>
  );
};
