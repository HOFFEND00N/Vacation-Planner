import React from "react";
import { Link } from "react-router-dom";

export function Menu() {
  return (
    <ul style={{ listStyle: "none", display: "flex", justifyContent: "flex-start" }}>
      <li>
        <Link to="/plan-vacation">Plan Vacation </Link>
      </li>
      <li style={{ paddingLeft: 10 }}>
        <Link to="/home">Home </Link>
      </li>
    </ul>
  );
}
