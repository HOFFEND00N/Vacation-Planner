import { render, screen } from "@testing-library/react";
import React from "react";
import { Legend } from "../Legend";
import "@testing-library/jest-dom";

test("should render table calendar legend", async () => {
  render(<Legend />);

  expect(screen.getByTestId("legend-container")).toBeInTheDocument();
  expect(screen.getByText("Vacation approved")).toBeInTheDocument();
  expect(screen.getByText("Vacation pending approval")).toBeInTheDocument();
  expect(screen.getByText("Day selected")).toBeInTheDocument();
  expect(screen.getByText("Weak workload")).toBeInTheDocument();
  expect(screen.getByText("Medium workload")).toBeInTheDocument();
  expect(screen.getByText("Heavy workload")).toBeInTheDocument();
});
