import { Switch, Route } from "react-router-dom";
import React from "react";
import moment from "moment";
import { ThemeContext, theme } from "@confirmit/react-themes";
import Banner from "@confirmit/react-banner";
import { PlanVacation } from "../PlanVacation";
import { TableCalendar } from "../TableCalendar";
import "./app.css";

export const App = ({ currentDate }: { currentDate: moment.Moment }) => {
  return (
    <ThemeContext.Provider value={theme.themeNames.material}>
      <Banner />
      <Switch>
        <Route path="/plan-vacation">
          <PlanVacation currentDate={currentDate} />
        </Route>
        <Route path="/">
          <TableCalendar currentDate={currentDate} />
        </Route>
      </Switch>
    </ThemeContext.Provider>
  );
};
