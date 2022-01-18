import React from "react";
import { render, screen } from "@testing-library/react";
import moment from "moment";
import { VacationDates } from "../VacationDates";
import "@testing-library/jest-dom";

describe("VacationDates", () => {
  test("should render", () => {
    render(
      <VacationDates
        vacationStartDate={moment("1-11-2021", "DD-MM-YYYY")}
        vacationEndDate={moment("14-11-2021", "DD-MM-YYYY")}
        handleDateStartChange={jest.fn()}
        handleDateEndChange={jest.fn()}
      />
    );

    expect(screen.getByText("Vacation dates")).toBeInTheDocument();
  });
});
