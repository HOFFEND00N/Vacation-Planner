import { render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { Cell } from "../Cell";
import "@testing-library/jest-dom";

describe("Cell ", () => {
  test("rendered", async () => {
    render(<Cell value={"test value"} className={"test class name"} />);

    expect(screen.getByText("test value")).toBeInTheDocument();
  });

  test("cell onClick fired", () => {
    const mockOnClick = jest.fn();

    render(<Cell value={"test value"} className={"test class name"} handleOnClick={mockOnClick} />);
    userEvent.click(screen.getByText("test value"));

    expect(mockOnClick).toBeCalledTimes(1);
  });
});
