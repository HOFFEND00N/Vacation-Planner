import { render, screen, within } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import moment from "moment";
import userEvent from "@testing-library/user-event";
import { Body } from "../Body";
import { TableCalendarContext } from "../../TableCalendarContext/TableCalendarContext";

jest.mock("../../../../constants.ts", () => {
  return {};
});

describe("Body", () => {
  test("should render a component", async () => {
    const mockOnClick = jest.fn();

    render(
      <TableCalendarContext.Provider
        value={{ handleClick: mockOnClick, currentTableCalendarDate: moment(new Date("1-11-2021")), vacations: [] }}
      >
        <Body
          vacationStart={{ date: new Date(1), isSelected: false }}
          vacationEnd={{ date: new Date(1), isSelected: false }}
          vacations={[]}
          teamMembers={[
            { id: "user 2", name: "user 2" },
            { id: "user 1", name: "user 1" },
          ]}
          currentUser={{ id: "user 1", name: "user 1" }}
        />
      </TableCalendarContext.Provider>
    );

    expect(screen.getByTestId("table-calendar-body")).toBeInTheDocument();
  });

  test("should select cell, when user click", async () => {
    const mockOnClick = jest.fn();

    render(
      <TableCalendarContext.Provider
        value={{ handleClick: mockOnClick, currentTableCalendarDate: moment(new Date("1-11-2021")), vacations: [] }}
      >
        <Body
          vacationStart={{ date: new Date(1), isSelected: false }}
          vacationEnd={{ date: new Date(1), isSelected: false }}
          vacations={[]}
          teamMembers={[
            { id: "user 2", name: "user 2" },
            { id: "user 1", name: "user 1" },
          ]}
          currentUser={{ id: "user 1", name: "user 1" }}
        />
      </TableCalendarContext.Provider>
    );

    const currentUserRow = screen.getByTestId("row user 1");
    userEvent.click(within(currentUserRow).getAllByTestId("table-cell")[2]);
    expect(mockOnClick).toBeCalledTimes(1);
  });

  test("should not select cell, when user click", async () => {
    const mockOnClick = jest.fn();

    render(
      <TableCalendarContext.Provider
        value={{ handleClick: mockOnClick, currentTableCalendarDate: moment(new Date("1-11-2021")), vacations: [] }}
      >
        <Body
          vacationStart={{ date: new Date(1), isSelected: false }}
          vacationEnd={{ date: new Date(1), isSelected: false }}
          vacations={[]}
          teamMembers={[
            { id: "user 2", name: "user 2" },
            { id: "user 1", name: "user 1" },
          ]}
          currentUser={{ id: "user 1", name: "user 1" }}
        />
      </TableCalendarContext.Provider>
    );

    const userRow = screen.getByTestId("row user 2");
    userEvent.click(within(userRow).getAllByTestId("table-cell")[2]);
    expect(mockOnClick).toBeCalledTimes(0);
  });
});
