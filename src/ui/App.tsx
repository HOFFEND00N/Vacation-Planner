import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import React from "react";
import { Register } from "./Register";
import { Login } from "./Login";
import { EmailConfirmed } from "./EmailConfirmed";
import { Welcome } from "./Welcome";

export function App() {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to="/">Login </Link>
          </li>
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
        </Switch>
      </div>
    </BrowserRouter>
  );
}
