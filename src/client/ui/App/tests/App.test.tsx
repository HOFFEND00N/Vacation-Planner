import React from "react";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { App } from "../App";
import { getTeamMembers } from "../../../application/getTeamMembers";
import { getVacations } from "../../../application/getVacations";

jest.mock("../../../application/getVacations");
jest.mock("../../../application/getTeamMembers");

test("App rendered", async () => {
  (getTeamMembers as jest.Mock).mockReturnValue({
    teamMembers: [
      { id: "user 2", name: "user 2" },
      { id: "user 1", name: "user 1" },
    ],
    currentUser: { id: "user 1", name: "user 1" },
  });
  (getVacations as jest.Mock).mockReturnValue([]);
  const history = createMemoryHistory();

  render(
    <Router history={history}>
      <App />
    </Router>
  );

  expect(screen.getByText("Please wait, searching your teammates...")).toBeInTheDocument();

  await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));
  expect(screen.getByTestId("table-calendar-body")).toBeInTheDocument();
});
