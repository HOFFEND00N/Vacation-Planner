import React from "react";
import { Link } from "react-router-dom";
import styles from "./menu.css";

export function Menu() {
  return (
    <ul className={styles.menu}>
      <li>
        <Link to="/plan-vacation">Plan Vacation </Link>
      </li>
      <li className={styles["menu__item"]}>
        <Link to="/home">Home </Link>
      </li>
    </ul>
  );
}
