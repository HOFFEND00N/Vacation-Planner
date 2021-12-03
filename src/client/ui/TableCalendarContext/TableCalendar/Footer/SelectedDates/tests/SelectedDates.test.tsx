import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { SelectedDates } from "../SelectedDates";

describe("Selected dates", () => {
  test("rendered and empty", () => {
    render(
      <SelectedDates
        vacationStart={{ isSelected: false, date: new Date(1) }}
        vacationEnd={{ isSelected: false, date: new Date(1) }}
      />
    );

    expect(screen.getByTestId("selected-dates")).toBeInTheDocument();
    expect(screen.getByTestId("selected-dates")).toBeEmptyDOMElement();
  });

  test("rendered and display vacation start", () => {
    render(
      <SelectedDates
        vacationStart={{ isSelected: true, date: new Date("1-11-2021") }}
        vacationEnd={{ isSelected: false, date: new Date(1) }}
      />
    );

    expect(screen.getByTestId("selected-dates")).toBeInTheDocument();
    expect(screen.getByText("Mon Jan 11 2021")).toBeInTheDocument();
  });

  test("rendered and display vacation start and vacation end", () => {
    render(
      <SelectedDates
        vacationStart={{ isSelected: true, date: new Date("1-11-2021") }}
        vacationEnd={{ isSelected: true, date: new Date("1-15-2021") }}
      />
    );

    expect(screen.getByTestId("selected-dates")).toBeInTheDocument();
    expect(screen.getByText("Mon Jan 11 2021 - Fri Jan 15 2021")).toBeInTheDocument();
  });
});
