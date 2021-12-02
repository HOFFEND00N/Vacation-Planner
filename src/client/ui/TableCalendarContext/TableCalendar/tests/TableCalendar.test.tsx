import { render, screen, waitForElementToBeRemoved, within } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import moment from "moment";
import userEvent from "@testing-library/user-event";
import { TableCalendar } from "../TableCalendar";
import { getTeamMembers } from "../../../../application/getTeamMembers";
import { getVacations } from "../../../../application/getVacations";

jest.mock("../../../../application/getVacations");
jest.mock("../../../../application/getTeamMembers");

test("Table calendar rendered, then month change to next, then month change to previous, then click on selectable cell, then click on not selectable cell", async () => {
  (getTeamMembers as jest.Mock).mockReturnValue({
    teamMembers: [
      { id: "user 2", name: "user 2" },
      { id: "user 1", name: "user 1" },
    ],
    currentUser: { id: "user 1", name: "user 1" },
  });
  (getVacations as jest.Mock).mockReturnValue([]);

  const today = moment(new Date("1-11-2021"));
  render(<TableCalendar currentDate={today} />);

  //renders all components
  expect(screen.getByTestId("table-calendar-container")).toBeInTheDocument();
  expect(screen.getByTestId("table-calendar-pager")).toBeInTheDocument();
  expect(screen.getByTestId("table-calendar-legend-container")).toBeInTheDocument();
  expect(screen.getByText("Please wait, searching your teammates...")).toBeInTheDocument();

  //team members has been fetched, component updates
  await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));
  expect(screen.getByTestId("table-calendar-body")).toBeInTheDocument();
  expect(screen.getByText("January 2021")).toBeInTheDocument();

  //user click to view next month
  const nextMonthButton = screen.getByTestId("table-calendar-controls-next-month-change");
  userEvent.click(nextMonthButton);
  expect(screen.getByText("February 2021")).toBeInTheDocument();

  //user click to view previous month
  const previousMonthButton = screen.getByTestId("table-calendar-controls-previous-month-change");
  userEvent.click(previousMonthButton);
  expect(screen.getByText("January 2021")).toBeInTheDocument();

  //check that plan vacation button is disabled
  const planVacationButton = screen.getByTestId("plan-vacation-button");
  expect(planVacationButton).toHaveAttribute("disabled");

  //user selects start vacation date, plan vacation button is enabled
  const currentUserRow = screen.getByTestId("table-calendar-row user 1");
  userEvent.click(within(currentUserRow).getAllByTestId("table-cell")[2]);
  expect(within(currentUserRow).getAllByTestId("table-cell")[2]).toHaveClass("table-calendar-element-selected");
  expect(planVacationButton.attributes.getNamedItem("disabled")).toEqual(null);

  //user selects end vacation date, plan vacation button is enabled
  userEvent.click(within(currentUserRow).getAllByTestId("table-cell")[4]);
  expect(within(currentUserRow).getAllByTestId("table-cell")[2]).toHaveClass("table-calendar-element-selected");
  expect(within(currentUserRow).getAllByTestId("table-cell")[3]).toHaveClass("table-calendar-element-selected");
  expect(within(currentUserRow).getAllByTestId("table-cell")[4]).toHaveClass("table-calendar-element-selected");
  expect(planVacationButton.attributes.getNamedItem("disabled")).toEqual(null);

  //user selects new start vacation date, plan vacation button is enabled
  userEvent.click(within(currentUserRow).getAllByTestId("table-cell")[3]);
  expect(within(currentUserRow).getAllByTestId("table-cell")[3]).toHaveClass("table-calendar-element-selected");
  expect(
    within(currentUserRow).getAllByTestId("table-cell")[2].classList.contains("table-calendar-element-selected")
  ).toEqual(false);
  expect(
    within(currentUserRow).getAllByTestId("table-cell")[4].classList.contains("table-calendar-element-selected")
  ).toEqual(false);
  expect(planVacationButton.attributes.getNamedItem("disabled")).toEqual(null);

  //user tries select different person row, plan vacation button is enabled
  const userRow = screen.getByTestId("table-calendar-row user 2");
  userEvent.click(within(userRow).getAllByTestId("table-cell")[2]);
  expect(within(userRow).getAllByTestId("table-cell")[2].classList.contains("table-calendar-element-selected")).toEqual(
    false
  );
  expect(planVacationButton.attributes.getNamedItem("disabled")).toEqual(null);
});
