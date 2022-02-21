import { render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import moment from "moment";
import { describe, test } from "@jest/globals";
import { VacationDataCell } from "../VacationDataCell";
import "@testing-library/jest-dom";
import { TableCalendarContext } from "../../../../../TableCalendarContext/TableCalendarContext";
import { VacationType } from "../../../../../../../../shared";

describe("UserDataCell", () => {
  test("should render", async () => {
    render(
      <VacationDataCell vacationType={VacationType.APPROVED} date={new Date("1-11-2021")} isSelectable isSelected />
    );

    expect(screen.getByTestId("table-cell")).toBeInTheDocument();
  });

  test("should fire cell onClick event", () => {
    const mockOnClick = jest.fn();

    render(
      <TableCalendarContext.Provider
        value={{ handleClick: mockOnClick, currentTableCalendarDate: moment(), vacations: [] }}
      >
        <VacationDataCell
          date={new Date("1-11-2021")}
          vacationType={VacationType.APPROVED}
          isSelectable
          isSelected={false}
        />
      </TableCalendarContext.Provider>
    );
    userEvent.click(screen.getByTestId("table-cell"));

    expect(mockOnClick).toBeCalledTimes(1);
  });

  test("should not fire onClick, when cell is not selectable", () => {
    const mockOnClick = jest.fn();

    render(
      <TableCalendarContext.Provider
        value={{ handleClick: mockOnClick, currentTableCalendarDate: moment(), vacations: [] }}
      >
        <VacationDataCell
          date={new Date("1-11-2021")}
          vacationType={VacationType.APPROVED}
          isSelectable={false}
          isSelected={false}
        />
      </TableCalendarContext.Provider>
    );
    userEvent.click(screen.getByTestId("table-cell"));

    expect(mockOnClick).toBeCalledTimes(0);
  });
});
