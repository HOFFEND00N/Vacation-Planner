import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { Footer } from "../Footer";

describe("Footer", () => {
  test("should render, do not select vacation", () => {
    render(
      <Footer
        vacationStart={{ isSelected: false, date: new Date(1) }}
        vacationEnd={{ isSelected: false, date: new Date(1) }}
      />
    );

    expect(screen.getByTestId("footer-container")).toBeInTheDocument();
    expect(screen.getByTestId("legend-container")).toBeInTheDocument();
    expect(screen.getByTestId("selected-dates")).toBeInTheDocument();
    expect(screen.getByTestId("selected-dates")).toBeEmptyDOMElement();
    expect(screen.getByRole("button")).toBeInTheDocument();
    const planVacationButton = screen.getByTestId("plan-vacation-button");
    expect(planVacationButton).toHaveAttribute("disabled");
  });

  test("should render, select vacation start", () => {
    render(
      <Footer
        vacationStart={{ isSelected: true, date: new Date("1-11-2021") }}
        vacationEnd={{ isSelected: false, date: new Date(1) }}
      />
    );

    expect(screen.getByTestId("footer-container")).toBeInTheDocument();
    expect(screen.getByTestId("legend-container")).toBeInTheDocument();
    expect(screen.getByTestId("selected-dates")).toBeInTheDocument();
    expect(screen.getByText("Mon Jan 11 2021")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    const planVacationButton = screen.getByTestId("plan-vacation-button");
    expect(planVacationButton.attributes.getNamedItem("disabled")).toEqual(null);
  });

  test("should render, select vacation start and vacation end", () => {
    render(
      <Footer
        vacationStart={{ isSelected: true, date: new Date("1-11-2021") }}
        vacationEnd={{ isSelected: true, date: new Date("1-15-2021") }}
      />
    );

    expect(screen.getByTestId("footer-container")).toBeInTheDocument();
    expect(screen.getByTestId("legend-container")).toBeInTheDocument();
    expect(screen.getByTestId("selected-dates")).toBeInTheDocument();
    expect(screen.getByText("Mon Jan 11 2021 - Fri Jan 15 2021")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    const planVacationButton = screen.getByTestId("plan-vacation-button");
    expect(planVacationButton.attributes.getNamedItem("disabled")).toEqual(null);
  });
});
