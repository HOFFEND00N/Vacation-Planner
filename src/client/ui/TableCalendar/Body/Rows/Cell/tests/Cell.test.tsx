import { render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import moment from "moment";
import { Cell } from "../Cell";
import "@testing-library/jest-dom";
import { TableCalendarContext } from "../../../../TableCalendarContext/TableCalendarContext";

describe("Cell ", () => {
  test("should render", async () => {
    render(<Cell value="test value" />);

    expect(screen.getByText("test value")).toBeInTheDocument();
  });

  test("should have className, when isDaysColumn props passed", async () => {
    const expectedClassName = "cell-days-column";

    render(<Cell value="test value" isDaysColumn />);

    expect(screen.getByText("test value").classList.contains(expectedClassName)).toEqual(true);
  });

  test("should fire cell onClick event", () => {
    const mockOnClick = jest.fn();

    render(
      <TableCalendarContext.Provider value={{ handleClick: mockOnClick, currentTableCalendarDate: moment() }}>
        <Cell value="test value" date={new Date("1-11-2021")} cellSelectable />
      </TableCalendarContext.Provider>
    );
    userEvent.click(screen.getByText("test value"));

    expect(mockOnClick).toBeCalledTimes(1);
  });

  test("should not fire onClick, when cell is not selectable", () => {
    const mockOnClick = jest.fn();

    render(
      <TableCalendarContext.Provider value={{ handleClick: mockOnClick, currentTableCalendarDate: moment() }}>
        <Cell value="test value" date={new Date("1-11-2021")} />
      </TableCalendarContext.Provider>
    );
    userEvent.click(screen.getByText("test value"));

    expect(mockOnClick).toBeCalledTimes(0);
  });
});
