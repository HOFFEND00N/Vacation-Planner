import { render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { Cell } from "../Cell";
import "@testing-library/jest-dom";
import { TableCalendarContext } from "../../../../TableCalendarContext/TableCalendarContext";

describe("Cell ", () => {
  test("should render", async () => {
    render(<Cell value={"test value"} className={"test class name"} />);

    expect(screen.getByText("test value")).toBeInTheDocument();
  });

  test("should fire cell onClick event", () => {
    const mockOnClick = jest.fn();

    render(
      <TableCalendarContext.Provider value={{ handleOnClick: mockOnClick }}>
        <Cell value={"test value"} className={"test class name"} date={new Date("1-11-2021")} />
      </TableCalendarContext.Provider>
    );
    userEvent.click(screen.getByText("test value"));

    expect(mockOnClick).toBeCalledTimes(1);
  });
});
