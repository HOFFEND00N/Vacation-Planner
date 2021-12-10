import { render, screen, waitForElementToBeRemoved, within } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import moment from "moment";
import userEvent from "@testing-library/user-event";
import { TableCalendar } from "../TableCalendar";
import { getTeamMembers } from "../../../application/getTeamMembers";
import { getVacations } from "../../../application/getVacations";

jest.mock("../../../application/getVacations");
jest.mock("../../../application/getTeamMembers");

describe("Table calendar", () => {
  let currentTableCalendarDate;
  beforeEach(() => {
    (getTeamMembers as jest.Mock).mockReturnValue({
      teamMembers: [
        { id: "user 2", name: "user 2" },
        { id: "user 1", name: "user 1" },
      ],
      currentUser: { id: "user 1", name: "user 1" },
    });
    (getVacations as jest.Mock).mockReturnValue([]);
    currentTableCalendarDate = moment(new Date("1-11-2021"));
  });

  test("should render, plan vacation button is disabled, then click on not selectable cell", async () => {
    render(<TableCalendar currentDate={currentTableCalendarDate} />);

    expect(screen.getByTestId("table-calendar-container")).toBeInTheDocument();
    expect(screen.getByTestId("pager")).toBeInTheDocument();
    expect(screen.getByTestId("legend-container")).toBeInTheDocument();
    expect(screen.getByText("Please wait, searching your teammates...")).toBeInTheDocument();

    await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));
    expect(screen.getByTestId("table-calendar-body")).toBeInTheDocument();
    expect(screen.getByText("January 2021")).toBeInTheDocument();

    const planVacationButton = screen.getByTestId("plan-vacation-button");
    expect(planVacationButton).toHaveAttribute("disabled");
  });

  test("should change month to next", async () => {
    render(<TableCalendar currentDate={currentTableCalendarDate} />);
    await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));

    const nextMonthButton = screen.getByTestId("pager__controls-next-month-change");
    userEvent.click(nextMonthButton);
    expect(screen.getByText("February 2021")).toBeInTheDocument();
  });

  test("should change month to previous", async () => {
    render(<TableCalendar currentDate={currentTableCalendarDate} />);
    await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));

    const previousMonthButton = screen.getByTestId("pager__controls-previous-month-change");
    userEvent.click(previousMonthButton);
    expect(screen.getByText("December 2020")).toBeInTheDocument();
  });

  test("should select start and end vacation dates", async () => {
    render(<TableCalendar currentDate={currentTableCalendarDate} />);
    await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));

    //user selects start vacation date, plan vacation button is enabled
    const planVacationButton = screen.getByTestId("plan-vacation-button");
    const currentUserRow = screen.getByTestId("row user 1");
    userEvent.click(within(currentUserRow).getAllByTestId("table-cell")[3]);
    expect(within(currentUserRow).getAllByTestId("table-cell")[3]).toHaveClass("cell--selected");
    expect(planVacationButton.attributes.getNamedItem("disabled")).toEqual(null);

    //user selects end vacation date, plan vacation button is enabled
    userEvent.click(within(currentUserRow).getAllByTestId("table-cell")[5]);
    expect(within(currentUserRow).getAllByTestId("table-cell")[3]).toHaveClass("cell--selected");
    expect(within(currentUserRow).getAllByTestId("table-cell")[4]).toHaveClass("cell--selected");
    expect(within(currentUserRow).getAllByTestId("table-cell")[5]).toHaveClass("cell--selected");
    expect(planVacationButton.attributes.getNamedItem("disabled")).toEqual(null);
  });

  test("should select start vacation date, then select it again", async () => {
    render(<TableCalendar currentDate={currentTableCalendarDate} />);
    await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));

    const planVacationButton = screen.getByTestId("plan-vacation-button");
    const currentUserRow = screen.getByTestId("row user 1");
    //user selects new start vacation date, plan vacation button is enabled
    userEvent.click(within(currentUserRow).getAllByTestId("table-cell")[4]);
    expect(within(currentUserRow).getAllByTestId("table-cell")[4]).toHaveClass("cell--selected");
    expect(within(currentUserRow).getAllByTestId("table-cell")[3].classList.contains("cell--selected")).toEqual(false);
    expect(within(currentUserRow).getAllByTestId("table-cell")[5].classList.contains("cell--selected")).toEqual(false);
    expect(planVacationButton.attributes.getNamedItem("disabled")).toEqual(null);

    //user selects end vacation date, but vacation end date < start vacation date => new start vacation date selected, plan vacation button is enabled
    userEvent.click(within(currentUserRow).getAllByTestId("table-cell")[3]);
    expect(within(currentUserRow).getAllByTestId("table-cell")[3]).toHaveClass("cell--selected");
    expect(within(currentUserRow).getAllByTestId("table-cell")[4].classList.contains("cell--selected")).toEqual(false);
    expect(planVacationButton.attributes.getNamedItem("disabled")).toEqual(null);
  });

  test("should not select start vacation date", async () => {
    render(<TableCalendar currentDate={currentTableCalendarDate} />);
    await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));

    const planVacationButton = screen.getByTestId("plan-vacation-button");
    const userRow = screen.getByTestId("row user 2");
    userEvent.click(within(userRow).getAllByTestId("table-cell")[2]);
    expect(within(userRow).getAllByTestId("table-cell")[2].classList.contains("cell--selected")).toEqual(false);
    expect(planVacationButton).toHaveAttribute("disabled");
  });

  test("should show error message, when error happens while fetching data from server", async () => {
    (getTeamMembers as jest.Mock).mockImplementation(() => {
      throw Error("error while fetching data from server");
    });

    render(<TableCalendar currentDate={currentTableCalendarDate} />);

    expect(screen.getByText("Something went wrong... Please try again later.")).toBeInTheDocument();
  });
});
