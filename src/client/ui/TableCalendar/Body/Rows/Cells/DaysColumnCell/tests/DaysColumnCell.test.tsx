import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { DaysColumnCell } from "../DaysColumnCell";

describe("DaysColumnCell", () => {
  test("should render", async () => {
    render(<DaysColumnCell value="test value" />);

    expect(screen.getByText("test value")).toBeInTheDocument();
  });
});
