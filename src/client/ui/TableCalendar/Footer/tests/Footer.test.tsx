import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Footer } from "../Footer";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

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

  test("should redirect to /plan-vacation URL on click, when vacation vacation start and vacation end selected", () => {
    render(
      <Footer
        vacationStart={{ isSelected: true, date: new Date("1-11-2021") }}
        vacationEnd={{ isSelected: true, date: new Date("1-15-2021") }}
      />
    );

    userEvent.click(screen.getByRole("button"));
    expect(mockHistoryPush).toHaveBeenCalledWith({
      pathname: "/plan-vacation",
      state: {
        vacationStart: { date: new Date("1-11-2021"), isSelected: true },
        vacationEnd: { date: new Date("1-15-2021"), isSelected: true },
      },
    });
  });

  test("should redirect to /plan-vacation URL on click, when vacation start selected", () => {
    render(
      <Footer vacationStart={{ isSelected: true, date: new Date("1-11-2021") }} vacationEnd={{ isSelected: false }} />
    );

    userEvent.click(screen.getByRole("button"));
    expect(mockHistoryPush).toHaveBeenCalledWith({
      pathname: "/plan-vacation",
      state: {
        vacationStart: { date: new Date("1-11-2021"), isSelected: true },
        vacationEnd: { date: new Date("1-11-2021"), isSelected: true },
      },
    });
  });
});
