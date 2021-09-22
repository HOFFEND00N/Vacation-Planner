import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import React from "react";
import { PlanVacation } from "./PlanVacation";
import { Home } from "./Home";

export function App() {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to="/planVacation">Plan Vacation </Link>
          </li>
          <li>
            <Link to="/home">Home </Link>
          </li>
        </ul>
        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/planVacation">
            <PlanVacation />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
