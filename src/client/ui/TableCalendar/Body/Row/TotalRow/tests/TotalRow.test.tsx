import { render, screen } from "@testing-library/react";
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

    expect(screen.getByTestId("table-calendar-total-row")).toBeInTheDocument();
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
              start: new Date("1-20-2021"),
              end: new Date("1-26-2021"),
              userId: "4",
              type: VacationType.APPROVED,
              id: "vacation 1",
            },
          ]}
          teamMembersCount={8}
        />
      </TableCalendarContext.Provider>
    );

    expect(screen.getByTestId("table-calendar-total-row")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getAllByTestId("table-cell").length).toEqual(daysInMonth + 1);
  });
});
