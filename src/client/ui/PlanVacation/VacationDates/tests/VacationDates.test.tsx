import React from "react";
import { render, screen } from "@testing-library/react";
import { VacationDates } from "../VacationDates";
import "@testing-library/jest-dom";

describe("VacationDates", () => {
  test("should render", () => {
    render(<VacationDates vacationStartDate={new Date("1-11-2021")} vacationEndDate={new Date("14-11-2021")} />);

    expect(screen.getByText("Vacation dates")).toBeInTheDocument();
  });
});
