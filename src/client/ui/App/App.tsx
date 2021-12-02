import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";
import moment from "moment";
import { PlanVacation } from "../PlanVacation";
import { Menu } from "../Menu/Menu";
import { TableCalendar } from "../TableCalendar/TableCalendar";
import styles from "./app.module.css";

export function App() {
  return (
    <BrowserRouter className={styles["*"]}>
      <div>
        <Menu />
        <hr />

        <Switch>
          <Route path="/plan-vacation">
            <PlanVacation />
          </Route>
          <Route path={["/home", "/"]}>
            <TableCalendar currentDate={moment()} />;
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
