import { render, screen } from "@testing-library/react";
import React from "react";
import moment from "moment";
import userEvent from "@testing-library/user-event";
import { BodyRow } from "../BodyRow";
import "@testing-library/jest-dom";
import { TableCalendarContext } from "../../../../TableCalendarContext/TableCalendarContext";

describe("Body row", () => {
  test("should render", () => {
    const daysInMonth = 31;

    render(
      <BodyRow
        today={moment(new Date(1))}
        daysInMonth={daysInMonth}
        user={{ id: "user 1", name: "user 1" }}
        employeeName={"user 2"}
        vacations={[]}
        currentUser={{ id: "user 3", name: "user 3" }}
        vacationStart={{ date: new Date(1), isSelected: false }}
        vacationEnd={{ date: new Date(1), isSelected: false }}
      />
    );

    expect(screen.getByTestId("row user 1")).toBeInTheDocument();
    expect(screen.getAllByTestId("table-cell").length).toEqual(daysInMonth + 2);
  });

  test("should fire cell onClick event, when user clicks", () => {
    const mockOnClick = jest.fn();

    render(
      <TableCalendarContext.Provider value={{ handleOnClick: mockOnClick }}>
        <BodyRow
          today={moment(new Date(1))}
          daysInMonth={31}
          user={{ id: "user 1", name: "user 1" }}
          employeeName={"user 2"}
          vacations={[]}
          currentUser={{ id: "user 1", name: "user 3" }}
          vacationStart={{ date: new Date(1), isSelected: false }}
          vacationEnd={{ date: new Date(1), isSelected: false }}
        />
      </TableCalendarContext.Provider>
    );
    userEvent.click(screen.getAllByTestId("table-cell")[2]);

    expect(mockOnClick).toBeCalledTimes(1);
  });

  test(" should not fire cell onClick event, if cell is not selectable", () => {
    const mockOnClick = jest.fn();

    render(
      <BodyRow
        today={moment(new Date(1))}
        daysInMonth={31}
        user={{ id: "user 1", name: "user 1" }}
        employeeName={"user 2"}
        vacations={[]}
        currentUser={{ id: "user 3", name: "user 3" }}
        vacationStart={{ date: new Date(1), isSelected: false }}
        vacationEnd={{ date: new Date(1), isSelected: false }}
      />
    );
    userEvent.click(screen.getAllByTestId("table-cell")[2]);

    expect(mockOnClick).toBeCalledTimes(0);
  });
});
