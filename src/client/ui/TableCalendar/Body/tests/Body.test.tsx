import { render, screen, waitForElementToBeRemoved, within } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import moment from "moment";
import userEvent from "@testing-library/user-event";
import { Body } from "../Body";
import { getTeamMembers } from "../../../../application/getTeamMembers";
import { getVacations } from "../../../../application/getVacations";
import { TableCalendarContext } from "../../TableCalendarContext/TableCalendarContext";

jest.mock("../../../../application/getVacations");
jest.mock("../../../../application/getTeamMembers");
jest.mock("../../../../constants.ts", () => {
  return {};
});

beforeEach(() => {
  (getTeamMembers as jest.Mock).mockReturnValue({
    teamMembers: [
      { id: "user 2", name: "user 2" },
      { id: "user 1", name: "user 1" },
    ],
    currentUser: { id: "user 1", name: "user 1" },
  });
  (getVacations as jest.Mock).mockReturnValue([]);
});

describe("Body", () => {
  test("should render notification about team members searching, then render a component", async () => {
    const mockOnClick = jest.fn();
    const mockSetErrorMessage = jest.fn();

    render(
      <TableCalendarContext.Provider value={{ handleClick: mockOnClick }}>
        <Body
          currentTableCalendarDate={moment(new Date("1-11-2021"))}
          vacationStart={{ date: new Date(1), isSelected: false }}
          vacationEnd={{ date: new Date(1), isSelected: false }}
          setErrorMessage={mockSetErrorMessage}
        />
      </TableCalendarContext.Provider>
    );

    expect(screen.getByText("Please wait, searching your teammates...")).toBeInTheDocument();

    await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));
    expect(screen.getByTestId("table-calendar-body")).toBeInTheDocument();
  });

  test("should click on selectable cell, then click on not selectable cell", async () => {
    const mockOnClick = jest.fn();
    const mockSetErrorMessage = jest.fn();

    render(
      <TableCalendarContext.Provider value={{ handleClick: mockOnClick }}>
        <Body
          currentTableCalendarDate={moment(new Date("1-11-2021"))}
          vacationStart={{ date: new Date(1), isSelected: false }}
          vacationEnd={{ date: new Date(1), isSelected: false }}
          setErrorMessage={mockSetErrorMessage}
        />
      </TableCalendarContext.Provider>
    );

    await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));

    const currentUserRow = screen.getByTestId("row user 1");
    userEvent.click(within(currentUserRow).getAllByTestId("table-cell")[2]);
    expect(mockOnClick).toBeCalledTimes(1);
  });

  test("should click on not selectable cell", async () => {
    const mockOnClick = jest.fn();
    const mockSetErrorMessage = jest.fn();

    render(
      <TableCalendarContext.Provider value={{ handleClick: mockOnClick }}>
        <Body
          currentTableCalendarDate={moment(new Date("1-11-2021"))}
          vacationStart={{ date: new Date(1), isSelected: false }}
          vacationEnd={{ date: new Date(1), isSelected: false }}
          setErrorMessage={mockSetErrorMessage}
        />
      </TableCalendarContext.Provider>
    );

    await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));

    const userRow = screen.getByTestId("row user 2");
    userEvent.click(within(userRow).getAllByTestId("table-cell")[2]);
    expect(mockOnClick).toBeCalledTimes(0);
  });
});
