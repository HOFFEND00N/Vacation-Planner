import { render, screen } from "@testing-library/react";
import React from "react";
import { TableCalendarLegend } from "../TableCalendarLegend";
import "@testing-library/jest-dom";

test("table calendar legend rendered", async () => {
  render(<TableCalendarLegend />);

  expect(screen.getByTestId("legend-container")).toBeInTheDocument();
});
