import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";
import { PlanVacation } from "../PlanVacation";
import { Home } from "../Home";
import { Menu } from "../Menu";
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
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
