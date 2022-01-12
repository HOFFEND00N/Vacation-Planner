import { Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import moment from "moment";
import { ThemeContext, theme } from "@confirmit/react-themes";
import Banner from "@confirmit/react-banner";
import { PlanVacation } from "../PlanVacation/PlanVacation";
import { TableCalendar } from "../TableCalendar";
import "./app.css";
import { User } from "../../domain/types";
import { AppContext } from "./AppContext/AppContext";

export const App = () => {
  const [currentUser, setCurrentUser] = useState<User>({ id: "", name: "" });

  return (
    <ThemeContext.Provider value={theme.themeNames.material}>
      <AppContext.Provider value={{ currentUser, setCurrentUser }}>
        <Banner />
        <Switch>
          <Route path="/plan-vacation">
            <PlanVacation />
          </Route>
          <Route path="/">
            <TableCalendar currentDate={moment()} />;
          </Route>
        </Switch>
      </AppContext.Provider>
    </ThemeContext.Provider>
  );
};
