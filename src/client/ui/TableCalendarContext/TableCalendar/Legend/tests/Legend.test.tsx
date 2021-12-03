import { render, screen } from "@testing-library/react";
import React from "react";
import { Legend } from "../Legend";
import "@testing-library/jest-dom";

test("table calendar legend rendered", async () => {
  render(<Legend />);

  expect(screen.getByTestId("legend-container")).toBeInTheDocument();
});
