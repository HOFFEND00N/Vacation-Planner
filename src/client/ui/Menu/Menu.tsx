import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";

export function Menu() {
  return (
    <ul className={"menu"}>
      <li>
        <Link to="/plan-vacation">Plan Vacation </Link>
      </li>
      <li className={"menu__item"}>
        <Link to="/home">Home </Link>
      </li>
    </ul>
  );
}
