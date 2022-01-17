import { render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Cell } from "../Cell";

describe("Cell ", () => {
  test("should render", async () => {
    render(<Cell value="test value" />);

    expect(screen.getByText("test value")).toBeInTheDocument();
  });

  test("should fire cell onClick event", () => {
    const mockOnClick = jest.fn();

    render(<Cell value="test value" onClick={mockOnClick} />);
    userEvent.click(screen.getByText("test value"));

    expect(mockOnClick).toBeCalledTimes(1);
  });
});
