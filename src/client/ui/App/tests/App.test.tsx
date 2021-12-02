import React from "react";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import "@testing-library/jest-dom";
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

  render(<App />);

  expect(screen.getByText("Please wait, searching your teammates...")).toBeInTheDocument();
  expect(screen.getByRole("list")).toBeInTheDocument();

  await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));
  expect(screen.getByTestId("table-calendar-body")).toBeInTheDocument();
});
