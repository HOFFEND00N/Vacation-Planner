import { render, screen } from "@testing-library/react";
import React from "react";
import { LegendItem } from "../LegendItem";
import "@testing-library/jest-dom";

test("should render table calendar legend and table calendar legend item", async () => {
  render(<LegendItem itemName={"test item name"} className="test class name" />);

  expect(screen.getByTestId("legend-item-container")).toBeInTheDocument();
  expect(screen.getByText("test item name")).toBeInTheDocument();
});
