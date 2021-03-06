import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { HeaderRow } from "../HeaderRow";

describe("Header row", () => {
  test("should render", () => {
    const daysInMonth = 31;

    render(<HeaderRow daysInMonth={daysInMonth} />);

    expect(screen.getByTestId("table-calendar-header-row")).toBeInTheDocument();
    expect(screen.getByText("Days")).toBeInTheDocument();
    expect(screen.getAllByTestId("table-cell").length).toEqual(daysInMonth + 2);
  });
});
