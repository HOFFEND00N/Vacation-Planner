import { render, screen } from "@testing-library/react";
import React from "react";
import moment from "moment";
import userEvent from "@testing-library/user-event";
import { Pager } from "../Pager";
import "@testing-library/jest-dom";
import { TableCalendarContext } from "../../TableCalendarContext/TableCalendarContext";

describe("table calendar pager tests", () => {
  test("should render", async () => {
    const mockOnPreviousMonthChange = jest.fn();
    const mockOnNextMonthChange = jest.fn();
    const currentTableCalendarDate = moment("25-12-2021", "DD-MM-YYYY");

    render(
      <TableCalendarContext.Provider value={{ handleClick: jest.fn(), currentTableCalendarDate, vacations: [] }}>
        <Pager handlePreviousMonthChange={mockOnPreviousMonthChange} handleNextMonthChange={mockOnNextMonthChange} />
      </TableCalendarContext.Provider>
    );

    expect(screen.getByTestId("pager")).toBeInTheDocument();
    expect(screen.getByText("December 2021")).toBeInTheDocument();
  });

  test("should fire previous month change event", () => {
    const mockOnPreviousMonthChange = jest.fn();
    const mockOnNextMonthChange = jest.fn();
    const currentTableCalendarDate = moment("25-12-2021", "DD-MM-YYYY");

    render(
      <TableCalendarContext.Provider value={{ handleClick: jest.fn(), currentTableCalendarDate, vacations: [] }}>
        <Pager handlePreviousMonthChange={mockOnPreviousMonthChange} handleNextMonthChange={mockOnNextMonthChange} />
      </TableCalendarContext.Provider>
    );
    userEvent.click(screen.getByTestId("pager__controls-previous-month-change"));

    expect(mockOnPreviousMonthChange).toBeCalledTimes(1);
  });

  test("should fire next month change event", () => {
    const mockOnPreviousMonthChange = jest.fn();
    const mockOnNextMonthChange = jest.fn();
    const currentTableCalendarDate = moment("25-12-2021", "DD-MM-YYYY");

    render(
      <TableCalendarContext.Provider value={{ handleClick: jest.fn(), currentTableCalendarDate, vacations: [] }}>
        <Pager handlePreviousMonthChange={mockOnPreviousMonthChange} handleNextMonthChange={mockOnNextMonthChange} />
      </TableCalendarContext.Provider>
    );
    userEvent.click(screen.getByTestId("pager__controls-next-month-change"));

    expect(mockOnNextMonthChange).toBeCalledTimes(1);
  });
});
