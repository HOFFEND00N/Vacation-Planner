import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import React from "react";
import { Register } from "./Register";
import { Login } from "./Login";
import { EmailConfirmed } from "./EmailConfirmed";
import { Welcome } from "./Welcome";
import { Main } from "./Main";

export function App() {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/welcome">Welcome</Link>
          </li>
          <li>
            <Link to="/emailConfirmed">EmailConfirmed </Link>
          </li>
          <li>
            <Link to="/main">Main </Link>
          </li>
        </ul>
        <hr />

        <Switch>
          <Route exact path="/">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/emailConfirmed">
            <EmailConfirmed />
          </Route>
          <Route exact path="/welcome">
            <Welcome />
          </Route>
          <Route exact path="/main">
            <Main />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
