import React from "react";
import ReactDOM from "react-dom";
import { Register } from "./ui/Register";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Login } from "./ui/Login";
import { Welcome } from "./ui/Welcome";
import { EmailConfirmed } from "./ui/EmailConfirmed";

//TODO: extract to a separate file
function App() {
  return (
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
  );
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
