import { render, screen } from "@testing-library/react";
import React from "react";
import moment from "moment";
import userEvent from "@testing-library/user-event";
import { UserDataRow } from "../UserDataRow";
import "@testing-library/jest-dom";
import { TableCalendarContext } from "../../../../TableCalendarContext/TableCalendarContext";
import { VacationType } from "../../../../../../../shared";

describe("UserType data row", () => {
  test("should render", () => {
    const daysInMonth = 31;
    const mockOnClick = jest.fn();

    render(
      <TableCalendarContext.Provider
        value={{ handleClick: mockOnClick, currentTableCalendarDate: moment(new Date("1-11-2021")), vacations: [] }}
      >
        <UserDataRow
          daysInMonth={daysInMonth}
          user={{ id: "user 1", name: "user 1" }}
          employeeName="user 2"
          userVacations={[]}
          currentUser={{ id: "user 3", name: "user 3" }}
          vacationStart={{ date: new Date(1), isSelected: false }}
          vacationEnd={{ date: new Date(1), isSelected: false }}
        />
      </TableCalendarContext.Provider>
    );

    expect(screen.getByTestId("row user 1")).toBeInTheDocument();
    expect(screen.getAllByTestId("table-cell").length).toEqual(daysInMonth + 2);
  });

  test("should fire cell onClick event, when user clicks", () => {
    const mockOnClick = jest.fn();

    render(
      <TableCalendarContext.Provider
        value={{ handleClick: mockOnClick, currentTableCalendarDate: moment(new Date("1-11-2021")), vacations: [] }}
      >
        <UserDataRow
          daysInMonth={31}
          user={{ id: "user 1", name: "user 1" }}
          employeeName="user 2"
          userVacations={[]}
          currentUser={{ id: "user 1", name: "user 3" }}
          vacationStart={{ date: new Date(1), isSelected: false }}
          vacationEnd={{ date: new Date(1), isSelected: false }}
        />
      </TableCalendarContext.Provider>
    );
    userEvent.click(screen.getAllByTestId("table-cell")[2]);

    expect(mockOnClick).toBeCalledTimes(1);
  });

  test("should not fire cell onClick event, when it is not current user row", () => {
    const mockOnClick = jest.fn();

    render(
      <TableCalendarContext.Provider
        value={{ handleClick: mockOnClick, currentTableCalendarDate: moment(new Date("1-11-2021")), vacations: [] }}
      >
        <UserDataRow
          daysInMonth={31}
          user={{ id: "user 1", name: "user 1" }}
          employeeName="user 2"
          userVacations={[]}
          currentUser={{ id: "user 3", name: "user 3" }}
          vacationStart={{ date: new Date(1), isSelected: false }}
          vacationEnd={{ date: new Date(1), isSelected: false }}
        />
      </TableCalendarContext.Provider>
    );
    userEvent.click(screen.getAllByTestId("table-cell")[2]);
    userEvent.click(screen.getAllByTestId("table-cell")[10]);

    expect(mockOnClick).toBeCalledTimes(0);
  });

  test("should not fire cell onClick event, when cell has already planned vacation", () => {
    const mockOnClick = jest.fn();

    render(
      <TableCalendarContext.Provider
        value={{
          handleClick: mockOnClick,
          currentTableCalendarDate: moment(new Date("1-11-2021")),
          vacations: [
            {
              start: new Date("1-7-2021"),
              end: new Date("1-14-2021"),
              id: "vacationId",
              userId: "userId",
              type: VacationType.PENDING_APPROVAL,
            },
          ],
        }}
      >
        <UserDataRow
          daysInMonth={31}
          user={{ id: "user 1", name: "user 1" }}
          employeeName="user 2"
          userVacations={[
            {
              start: new Date("1-7-2021"),
              end: new Date("1-14-2021"),
              id: "vacationId",
              userId: "userId",
              type: VacationType.PENDING_APPROVAL,
            },
          ]}
          currentUser={{ id: "user 3", name: "user 3" }}
          vacationStart={{ date: new Date(1), isSelected: false }}
          vacationEnd={{ date: new Date(1), isSelected: false }}
        />
      </TableCalendarContext.Provider>
    );
    userEvent.click(screen.getAllByTestId("table-cell")[10]);

    expect(mockOnClick).toBeCalledTimes(0);
  });
});
