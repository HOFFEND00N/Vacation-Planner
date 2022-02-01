import { render, screen, waitForElementToBeRemoved, within } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import moment from "moment";
import userEvent from "@testing-library/user-event";
import { TableCalendar } from "../TableCalendar";
import { getTeamMembers } from "../../../application/getTeamMembers";
import { getVacations } from "../../../application/getVacations";
import { cancelUnapprovedVacation } from "../../../application/cancelUnapprovedVacation";
import { VacationType } from "../../../../shared";

jest.mock("../../../application/getVacations");
jest.mock("../../../application/getTeamMembers");
jest.mock("../../../application/cancelUnapprovedVacation");
jest.mock("react-router-dom", () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: "/",
    search: "",
    hash: "",
    state: null,
    key: "5nvxpbdafa",
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));
jest.mock("../../../constants.ts", () => {
  return {};
});

describe("Table calendar", () => {
  let currentTableCalendarDate;
  beforeEach(() => {
    (getTeamMembers as jest.Mock).mockReturnValue({
      teamMembers: [
        { id: "user 2", name: "user 2" },
        { id: "user 1", name: "user 1" },
      ],
      currentUser: { id: "user 1", name: "user 1" },
    });
    (getVacations as jest.Mock).mockReturnValue([]);
    currentTableCalendarDate = moment(new Date("1-11-2021"));
  });

  test("should render, plan vacation button is disabled, then click on not selectable cell", async () => {
    render(<TableCalendar currentDate={currentTableCalendarDate} />);

    expect(screen.getByText("Please wait, searching your teammates...")).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));

    expect(screen.getByTestId("table-calendar")).toBeInTheDocument();
    expect(screen.getByTestId("pager")).toBeInTheDocument();
    expect(screen.getByTestId("legend-container")).toBeInTheDocument();

    expect(screen.getByTestId("table-calendar-body")).toBeInTheDocument();
    expect(screen.getByText("January 2021")).toBeInTheDocument();

    const planVacationButton = screen.getByTestId("plan-vacation-button");
    expect(planVacationButton).toHaveAttribute("disabled");
  });

  test("should change month to next", async () => {
    render(<TableCalendar currentDate={currentTableCalendarDate} />);
    await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));

    const nextMonthButton = screen.getByTestId("pager__controls-next-month-change");
    userEvent.click(nextMonthButton);
    expect(screen.getByText("February 2021")).toBeInTheDocument();
  });

  test("should change month to previous", async () => {
    render(<TableCalendar currentDate={currentTableCalendarDate} />);
    await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));

    const previousMonthButton = screen.getByTestId("pager__controls-previous-month-change");
    userEvent.click(previousMonthButton);
    expect(screen.getByText("December 2020")).toBeInTheDocument();
  });

  test("should select start and end vacation dates", async () => {
    render(<TableCalendar currentDate={currentTableCalendarDate} />);
    await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));

    //user selects start vacation date, plan vacation button is enabled
    const planVacationButton = screen.getByTestId("plan-vacation-button");
    const currentUserRow = screen.getByTestId("row user 1");
    userEvent.click(within(currentUserRow).getAllByTestId("table-cell")[3]);
    expect(within(currentUserRow).getAllByTestId("table-cell")[3]).toHaveClass("cell--selected");
    expect(planVacationButton.attributes.getNamedItem("disabled")).toEqual(null);

    //user selects end vacation date, plan vacation button is enabled
    userEvent.click(within(currentUserRow).getAllByTestId("table-cell")[5]);
    expect(within(currentUserRow).getAllByTestId("table-cell")[3]).toHaveClass("cell--selected");
    expect(within(currentUserRow).getAllByTestId("table-cell")[4]).toHaveClass("cell--selected");
    expect(within(currentUserRow).getAllByTestId("table-cell")[5]).toHaveClass("cell--selected");
    expect(planVacationButton.attributes.getNamedItem("disabled")).toEqual(null);
  });

  test("should select start vacation date, then select it again", async () => {
    render(<TableCalendar currentDate={currentTableCalendarDate} />);
    await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));

    const planVacationButton = screen.getByTestId("plan-vacation-button");
    const currentUserRow = screen.getByTestId("row user 1");
    //user selects new start vacation date, plan vacation button is enabled
    userEvent.click(within(currentUserRow).getAllByTestId("table-cell")[4]);
    expect(within(currentUserRow).getAllByTestId("table-cell")[4]).toHaveClass("cell--selected");
    expect(within(currentUserRow).getAllByTestId("table-cell")[3].classList.contains("cell--selected")).toEqual(false);
    expect(within(currentUserRow).getAllByTestId("table-cell")[5].classList.contains("cell--selected")).toEqual(false);
    expect(planVacationButton.attributes.getNamedItem("disabled")).toEqual(null);

    //user selects end vacation date, but vacation end date < start vacation date => new start vacation date selected, plan vacation button is enabled
    userEvent.click(within(currentUserRow).getAllByTestId("table-cell")[3]);
    expect(within(currentUserRow).getAllByTestId("table-cell")[3]).toHaveClass("cell--selected");
    expect(within(currentUserRow).getAllByTestId("table-cell")[4].classList.contains("cell--selected")).toEqual(false);
    expect(planVacationButton.attributes.getNamedItem("disabled")).toEqual(null);
  });

  test("should not select start vacation date", async () => {
    render(<TableCalendar currentDate={currentTableCalendarDate} />);
    await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));

    const planVacationButton = screen.getByTestId("plan-vacation-button");
    const userRow = screen.getByTestId("row user 2");
    userEvent.click(within(userRow).getAllByTestId("table-cell")[2]);
    expect(within(userRow).getAllByTestId("table-cell")[2].classList.contains("cell--selected")).toEqual(false);
    expect(planVacationButton).toHaveAttribute("disabled");
  });

  test("should display error message, when server response with error", async () => {
    (getVacations as jest.Mock).mockImplementation(() => {
      throw new Error("error");
    });

    render(<TableCalendar currentDate={currentTableCalendarDate} />);

    expect(screen.getByText("Please wait, searching your teammates...")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByText("Please wait, searching your teammates..."));

    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  describe("UserVacations", () => {
    beforeEach(() => {
      (getVacations as jest.Mock).mockReturnValue([
        {
          start: new Date("1-1-2021"),
          end: new Date("1-11-2021"),
          userId: "user 1",
          type: VacationType.PENDING_APPROVAL,
          id: "vacation 1",
        },
      ]);
    });
    test("should cancel vacation, when cancel button clicked", async () => {
      render(<TableCalendar currentDate={currentTableCalendarDate} />);
      (cancelUnapprovedVacation as jest.Mock).mockReturnValue(jest.fn());

      await waitForElementToBeRemoved(() => screen.getByText("Please wait, searching your teammates..."));
      expect(screen.getByText("Fri Jan 01 2021 - Mon Jan 11 2021")).toBeInTheDocument();

      const cancelVacationButton = screen.getByText("Cancel vacation");
      userEvent.click(cancelVacationButton);

      const confirmationVacationCancellationButton = screen.getByText("Yes");
      userEvent.click(confirmationVacationCancellationButton);

      expect(screen.getByTestId("table-calendar")).toBeInTheDocument();
      expect(screen.queryByText("Fri Jan 01 2021 - Mon Jan 11 2021")).not.toBeInTheDocument();
      expect(screen.queryByText("Cancel vacation")).not.toBeInTheDocument();
    });

    test("should remain unchanged, when cancel button clicked but vacation cancellation not confirmed", async () => {
      render(<TableCalendar currentDate={currentTableCalendarDate} />);

      await waitForElementToBeRemoved(() => screen.getByText("Please wait, searching your teammates..."));
      expect(screen.getByText("Fri Jan 01 2021 - Mon Jan 11 2021")).toBeInTheDocument();

      const cancelVacationButton = screen.getByText("Cancel vacation");
      userEvent.click(cancelVacationButton);

      const confirmationVacationCancellationButton = screen.getByText("No");
      userEvent.click(confirmationVacationCancellationButton);

      expect(screen.queryByText("Fri Jan 01 2021 - Mon Jan 11 2021")).toBeInTheDocument();
      expect(screen.queryByText("Cancel vacation")).toBeInTheDocument();
    });
  });
});
