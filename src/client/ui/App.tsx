import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import React from "react";
import { PlanVacation } from "./PlanVacation";
import { Home } from "./Home";

export function App() {
  return (
    //TODO: extract menu to different component
    <BrowserRouter>
      <div>
        <ul style={{ listStyle: "none", display: "flex", justifyContent: "flex-start" }}>
          <li>
            <Link to="/plan-vacation">Plan Vacation </Link>
          </li>
          <li style={{ paddingLeft: 10 }}>
            <Link to="/home">Home </Link>
          </li>
        </ul>
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
