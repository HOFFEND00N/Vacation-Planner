import { Switch, Route } from "react-router-dom";
import React from "react";
import moment from "moment";
import { PlanVacation } from "../PlanVacation";
import { TableCalendar } from "../TableCalendarContext/TableCalendar";
import "./app.css";

export function App() {
  return (
    <Switch>
      <Route path="/plan-vacation">
        <PlanVacation />
      </Route>
      <Route path={["/home", "/"]}>
        <TableCalendar currentDate={moment()} />;
      </Route>
    </Switch>
  );
}
