import { render, screen, within } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import moment from "moment";
import { TotalRow } from "../TotalRow";
import { TableCalendarContext } from "../../../../TableCalendarContext/TableCalendarContext";
import { VacationType } from "../../../../../../../shared";

describe("Total row", () => {
  describe("0 vacations passed", () => {
    test("should render", () => {
      const daysInMonth = 31;

      render(
        <TableCalendarContext.Provider
          value={{ handleClick: jest.fn(), currentTableCalendarDate: moment(new Date("1-11-2021")), vacations: [] }}
        >
          <TotalRow daysInMonth={daysInMonth} vacations={[]} teamMembersCount={8} />
        </TableCalendarContext.Provider>
      );

      expect(screen.getByTestId("table-calendar-total-row")).toBeInTheDocument();
      expect(screen.getByText("Total")).toBeInTheDocument();
      expect(screen.getAllByTestId("table-cell").length).toEqual(daysInMonth + 1);
    });

    test("should have weak workload type in all cells", () => {
      const daysInMonth = 31;

      render(
        <TableCalendarContext.Provider
          value={{ handleClick: jest.fn(), currentTableCalendarDate: moment(new Date("1-11-2021")), vacations: [] }}
        >
          <TotalRow daysInMonth={daysInMonth} vacations={[]} teamMembersCount={8} />
        </TableCalendarContext.Provider>
      );

      const totalRow = screen.getByTestId("table-calendar-total-row");

      const totalRowElements = within(totalRow).getAllByTestId("table-cell").slice(1);
      totalRowElements.forEach((element) =>
        expect(element.classList.contains("total-cell--weak-workload")).toEqual(true)
      );
    });
  });
  describe("2 vacations passed", () => {
    test("should render", () => {
      const daysInMonth = 31;

      render(
        <TableCalendarContext.Provider
          value={{ handleClick: jest.fn(), currentTableCalendarDate: moment(new Date("1-11-2021")), vacations: [] }}
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

      expect(screen.getByTestId("table-calendar-total-row")).toBeInTheDocument();
      expect(screen.getByText("Total")).toBeInTheDocument();
      expect(screen.getAllByTestId("table-cell").length).toEqual(daysInMonth + 1);
    });

    test("should have weak workload type in every cell except vacation dates intersection", () => {
      const daysInMonth = 31;

      render(
        <TableCalendarContext.Provider
          value={{ handleClick: jest.fn(), currentTableCalendarDate: moment(new Date("1-11-2021")), vacations: [] }}
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

      const totalRowWeakWorkloadElements = within(totalRow)
        .getAllByTestId("table-cell")
        .filter((elem, index) => index < 5 && index > 7);
      totalRowWeakWorkloadElements.forEach((element) =>
        expect(element.classList.contains("total-cell--weak-workload")).toEqual(true)
      );

      const totalRowMediumWorkloadElements = within(totalRow).getAllByTestId("table-cell").slice(5, 7);
      totalRowMediumWorkloadElements.forEach((element) =>
        expect(element.classList.contains("total-cell--medium-workload")).toEqual(true)
      );
    });
  });
});
