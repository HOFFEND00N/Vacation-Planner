import { render, screen, waitForElementToBeRemoved, within } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import moment from "moment";
import userEvent from "@testing-library/user-event";
import { TableCalendarBody } from "../TableCalendarBody";
import { getTeamMembers } from "../../../../application/getTeamMembers";
import { getVacations } from "../../../../application/getVacations";

jest.mock("../../../../application/getVacations");
jest.mock("../../../../application/getTeamMembers");

test("render notification about team members searching, then renders a component, then click on selectable cell, then click on not selectable cell", async () => {
  (getTeamMembers as jest.Mock).mockReturnValue({
    teamMembers: [
      { id: "user 2", name: "user 2" },
      { id: "user 1", name: "user 1" },
    ],
    currentUser: { id: "user 1", name: "user 1" },
  });
  (getVacations as jest.Mock).mockReturnValue([]);
  const mockOnClick = jest.fn();

  render(
    <TableCalendarBody
      today={moment(new Date("1-11-2021"))}
      vacationStart={{ date: new Date(1), isSelected: false }}
      vacationEnd={{ date: new Date(1), isSelected: false }}
      handleOnClick={mockOnClick}
    />
  );

  expect(screen.getByText("Please wait, searching your teammates...")).toBeInTheDocument();

  await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));
  expect(screen.getByTestId("table-calendar-body")).toBeInTheDocument();

  const currentUserRow = screen.getByTestId("table-calendar-row user 1");
  userEvent.click(within(currentUserRow).getAllByTestId("table-cell")[2]);
  expect(mockOnClick).toBeCalledTimes(1);

  const userRow = screen.getByTestId("table-calendar-row user 2");
  userEvent.click(within(userRow).getAllByTestId("table-cell")[2]);
  expect(mockOnClick).toBeCalledTimes(1);
});
