import { render, screen } from "@testing-library/react";
import React from "react";
import moment from "moment";
import userEvent from "@testing-library/user-event";
import { Pager } from "../Pager";
import "@testing-library/jest-dom";

describe("table calendar legend tests", () => {
  test("rendered", async () => {
    const mockOnPreviousMonthChange = jest.fn();
    const mockOnNextMonthChange = jest.fn();
    const today = moment("25-12-2021", "DD-MM-YYYY");

    render(
      <Pager
        handlePreviousMonthChange={mockOnPreviousMonthChange}
        handleNextMonthChange={mockOnNextMonthChange}
        today={today}
      />
    );

    expect(screen.getByTestId("pager")).toBeInTheDocument();
    expect(screen.getByText("December 2021")).toBeInTheDocument();
  });

  test("previous month change event fired", () => {
    const mockOnPreviousMonthChange = jest.fn();
    const mockOnNextMonthChange = jest.fn();
    const today = moment("25-12-2021", "DD-MM-YYYY");

    render(
      <Pager
        handlePreviousMonthChange={mockOnPreviousMonthChange}
        handleNextMonthChange={mockOnNextMonthChange}
        today={today}
      />
    );
    userEvent.click(screen.getByTestId("table-calendar-controls-previous-month-change"));

    expect(mockOnPreviousMonthChange).toBeCalledTimes(1);
  });

  test("next month change event fired", () => {
    const mockOnPreviousMonthChange = jest.fn();
    const mockOnNextMonthChange = jest.fn();
    const today = moment("25-12-2021", "DD-MM-YYYY");

    render(
      <Pager
        handlePreviousMonthChange={mockOnPreviousMonthChange}
        handleNextMonthChange={mockOnNextMonthChange}
        today={today}
      />
    );
    userEvent.click(screen.getByTestId("table-calendar-controls-next-month-change"));

    expect(mockOnNextMonthChange).toBeCalledTimes(1);
  });
});
