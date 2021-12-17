import { render, screen, within } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import moment from "moment";
import { TotalRow } from "../TotalRow";
import { VacationType } from "../../../../../../domain/types";
import { TableCalendarContext } from "../../../../TableCalendarContext/TableCalendarContext";

describe("Total row", () => {
  test("should render, when 0 vacation passed", () => {
    const daysInMonth = 31;

    render(
      <TableCalendarContext.Provider
        value={{ handleClick: jest.fn(), currentTableCalendarDate: moment(new Date("1-11-2021")) }}
      >
        <TotalRow daysInMonth={daysInMonth} vacations={[]} teamMembersCount={8} />
      </TableCalendarContext.Provider>
    );

    const totalRow = screen.getByTestId("table-calendar-total-row");
    expect(totalRow).toBeInTheDocument();

    const totalRowElements = within(totalRow)
      .getAllByTestId("table-cell")
      .filter((elem, index) => index > 0);
    totalRowElements.forEach((element) =>
      expect(element.classList.contains("row__total-cell--weak-workload")).toEqual(true)
    );

    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getAllByTestId("table-cell").length).toEqual(daysInMonth + 1);
  });

  test("should render, when two vacation passed", () => {
    const daysInMonth = 31;

    render(
      <TableCalendarContext.Provider
        value={{ handleClick: jest.fn(), currentTableCalendarDate: moment(new Date("1-11-2021")) }}
      >
        <TotalRow
          daysInMonth={daysInMonth}
          vacations={[
            {
              start: new Date("1-1-2021"),
              end: new Date("1-7-2021"),
              userId: "2",
              type: VacationType.PENDING_APPROVAL,
              id: "vacation 2",
            },
            {
              start: new Date("1-5-2021"),
              end: new Date("1-12-2021"),
              userId: "4",
              type: VacationType.APPROVED,
              id: "vacation 1",
            },
          ]}
          teamMembersCount={5}
        />
      </TableCalendarContext.Provider>
    );

    const totalRow = screen.getByTestId("table-calendar-total-row");
    expect(totalRow).toBeInTheDocument();

    const totalRowWeakWorkloadElements = within(totalRow)
      .getAllByTestId("table-cell")
      .filter((elem, index) => index < 5 && index > 7);
    totalRowWeakWorkloadElements.forEach((element) =>
      expect(element.classList.contains("row__total-cell--weak-workload")).toEqual(true)
    );

    const totalRowMediumWorkloadElements = within(totalRow)
      .getAllByTestId("table-cell")
      .filter((elem, index) => index > 5 && index < 7);
    totalRowMediumWorkloadElements.forEach((element) =>
      expect(element.classList.contains("row__total-cell--medium-workload")).toEqual(true)
    );

    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getAllByTestId("table-cell").length).toEqual(daysInMonth + 1);
  });
});
