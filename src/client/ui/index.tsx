import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import moment from "moment";
import { App } from "./App";

const currentDate = moment();

ReactDOM.render(
  <BrowserRouter>
    <App currentDate={currentDate} />
  </BrowserRouter>,
  document.getElementById("root")
);
