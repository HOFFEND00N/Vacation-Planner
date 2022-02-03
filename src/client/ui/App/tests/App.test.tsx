import React from "react";
import { render, screen, waitForElementToBeRemoved, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import moment from "moment";
import userEvent from "@testing-library/user-event";
import { App } from "../App";
import { getTeamMembers } from "../../../application/getTeamMembers";
import { getVacations } from "../../../application/getVacations";

jest.mock("../../../application/getVacations");
jest.mock("../../../application/getTeamMembers");
jest.mock("../../../constants.ts", () => {
  return {};
});

const memoryRouterInitialEntries = [
  {
    pathname: "/plan-vacation",
    search: "",
    hash: "",
    state: {
      vacationStart: {
        date: moment("2-11-2021", "DD-MM-YYYY"),
      },
      vacationEnd: {
        date: moment("14-11-2021", "DD-MM-YYYY"),
      },
    },
    key: "sgdskldbgsbd",
  },
];

describe("App", () => {
  test("should render App, select one day vacation, navigate to plan vacation page, when plan vacation button clicked", async () => {
    (getTeamMembers as jest.Mock).mockReturnValue({
      teamMembers: [
        { id: "user 2", name: "user 2" },
        { id: "user 1", name: "user 1" },
      ],
      currentUser: { id: "user 1", name: "user 1" },
    });
    (getVacations as jest.Mock).mockReturnValue([]);

    render(
      <BrowserRouter>
        <App currentDate={moment("1-10-2021", "DD-MM-YYYY")} />
      </BrowserRouter>
    );

    expect(screen.getByText("Please wait, searching your teammates...")).toBeInTheDocument();

    await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));
    expect(screen.getByTestId("table-calendar-body")).toBeInTheDocument();

    const planVacationButton = screen.getByTestId("plan-vacation-button");
    const currentUserRow = screen.getByTestId("row user 1");

    userEvent.click(within(currentUserRow).getAllByTestId("table-cell")[3]);
    expect(within(currentUserRow).getAllByTestId("table-cell")[3]).toHaveClass("cell--selected");
    userEvent.click(planVacationButton);

    expect(screen.getByTestId("application-form-container")).toBeInTheDocument();
    expect(
      within(screen.getByTestId("application")).getByText("Прошу предоставить мне отпуск с 02.10.2021 до 02.10.2021")
    ).toBeInTheDocument();
  });

  test("should navigate to page with table calendar, when cancel button clicked in plan vacation page", async () => {
    (getTeamMembers as jest.Mock).mockReturnValue({
      teamMembers: [
        { id: "user 2", name: "user 2" },
        { id: "user 1", name: "user 1" },
      ],
      currentUser: { id: "user 1", name: "user 1" },
    });
    (getVacations as jest.Mock).mockReturnValue([]);
    render(
      <MemoryRouter initialEntries={memoryRouterInitialEntries}>
        <App currentDate={moment("1-10-2021", "DD-MM-YYYY")} />
      </MemoryRouter>
    );

    const CancelButton = screen.getByRole("button", { name: "Cancel" });
    userEvent.click(CancelButton);

    expect(screen.queryByTestId("application-form-container")).not.toBeInTheDocument();
    expect(screen.getByText("Please wait, searching your teammates...")).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));
    expect(screen.getByTestId("table-calendar-body")).toBeInTheDocument();
  });
});
