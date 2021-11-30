import { render, screen } from "@testing-library/react";
import React from "react";
import moment from "moment";
import userEvent from "@testing-library/user-event";
import { BodyRow } from "../BodyRow";
import "@testing-library/jest-dom";

describe("Body row", () => {
  test("rendered", () => {
    render(
      <BodyRow
        today={moment(new Date(1))}
        handleOnClick={() => undefined}
        daysInMonth={31}
        user={{ id: "user 1", name: "user 1" }}
        employeeName={"user 2"}
        vacations={[]}
        currentUser={{ id: "user 3", name: "user 3" }}
        vacationStart={{ date: new Date(1), isSelected: false }}
        vacationEnd={{ date: new Date(1), isSelected: false }}
      />
    );

    expect(screen.getByTestId("table-calendar-row user 1")).toBeInTheDocument();
  });

  test("cell onClick event fired", () => {
    const mockOnClick = jest.fn();

    render(
      <BodyRow
        today={moment(new Date(1))}
        handleOnClick={mockOnClick}
        daysInMonth={31}
        user={{ id: "user 1", name: "user 1" }}
        employeeName={"user 2"}
        vacations={[]}
        currentUser={{ id: "user 1", name: "user 3" }}
        vacationStart={{ date: new Date(1), isSelected: false }}
        vacationEnd={{ date: new Date(1), isSelected: false }}
      />
    );
    userEvent.click(screen.getAllByTestId("table-cell")[2]);

    expect(mockOnClick).toBeCalledTimes(1);
  });

  test("cell onClick event do not fired, because cell is not selectable", () => {
    const mockOnClick = jest.fn();

    render(
      <BodyRow
        today={moment(new Date(1))}
        handleOnClick={mockOnClick}
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
