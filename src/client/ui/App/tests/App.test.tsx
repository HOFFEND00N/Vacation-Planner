import React from "react";
import { queryHelpers, render, screen, waitForElementToBeRemoved, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import moment from "moment";
import userEvent from "@testing-library/user-event";
import { App } from "../App";
import { getTeamMembers } from "../../../application/getTeamMembers";
import { getVacations } from "../../../application/getVacations";
import { planVacation } from "../../../application/planVacation";

jest.mock("../../../application/getVacations");
jest.mock("../../../application/getTeamMembers");
jest.mock("../../../application/planVacation");
jest.mock("../../../constants.ts", () => {
  return {};
});

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

  test("should render App, show error, when server interaction fails", async () => {
    (getTeamMembers as jest.Mock).mockImplementation(() => {
      throw new Error("some error");
    });
    (getVacations as jest.Mock).mockReturnValue([]);

    render(
      <MemoryRouter>
        <App currentDate={moment("1-10-2021", "DD-MM-YYYY")} />
      </MemoryRouter>,
      { container: document.body }
    );

    expect(screen.getByText("some error")).toBeInTheDocument();
    expect(screen.getByText("No data")).toBeInTheDocument();
    const banner = queryHelpers.queryAllByAttribute("data-banner-message-type", document.body, "error")[0];
    userEvent.click(within(banner).getByRole("button"));
  });

  test("should navigate to plan vacation page, then plan vacation and redirect back to main page", async () => {
    (getTeamMembers as jest.Mock).mockReturnValue({
      teamMembers: [
        { id: "user 2", name: "user 2" },
        { id: "user 1", name: "user 1" },
      ],
      currentUser: { id: "user 1", name: "user 1" },
    });
    (getVacations as jest.Mock).mockReturnValue([]);
    const mockPlanVacation = jest.fn();
    (planVacation as jest.Mock).mockImplementation(mockPlanVacation);
    render(
      <MemoryRouter>
        <App currentDate={moment("1-10-2021", "DD-MM-YYYY")} />
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));

    const mainPagePlanVacationButton = screen.getByTestId("plan-vacation-button");
    const currentUserRow = screen.getByTestId("row user 1");

    userEvent.click(within(currentUserRow).getAllByTestId("table-cell")[3]);
    userEvent.click(mainPagePlanVacationButton);

    const input = queryHelpers.queryAllByAttribute(
      "data-test",
      screen.getByTestId("application-form-container"),
      "dropzone-file-input"
    )[0] as HTMLInputElement;
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    userEvent.upload(input, file);

    const planVacationButton = screen.getByRole("button", { name: "Plan vacation" });
    await userEvent.click(planVacationButton);

    expect(mockPlanVacation).toBeCalledTimes(1);
    expect(screen.getByText("Vacation successfully planned")).toBeInTheDocument();
    expect(screen.getByTestId("table-calendar")).toBeInTheDocument();
  });

  test("should navigate to plan vacation page, then fail to plan vacation and show error", async () => {
    (getTeamMembers as jest.Mock).mockReturnValue({
      teamMembers: [
        { id: "user 2", name: "user 2" },
        { id: "user 1", name: "user 1" },
      ],
      currentUser: { id: "user 1", name: "user 1" },
    });
    (getVacations as jest.Mock).mockReturnValue([]);
    (planVacation as jest.Mock).mockImplementation(() => {
      throw Error("some error");
    });
    render(
      <MemoryRouter>
        <App currentDate={moment("1-10-2021", "DD-MM-YYYY")} />
      </MemoryRouter>,
      { container: document.body }
    );

    await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));

    const mainPagePlanVacationButton = screen.getByTestId("plan-vacation-button");
    const currentUserRow = screen.getByTestId("row user 1");

    userEvent.click(within(currentUserRow).getAllByTestId("table-cell")[3]);
    userEvent.click(mainPagePlanVacationButton);

    const input = queryHelpers.queryAllByAttribute(
      "data-test",
      screen.getByTestId("application-form-container"),
      "dropzone-file-input"
    )[0] as HTMLInputElement;
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    userEvent.upload(input, file);

    const planVacationButton = screen.getByRole("button", { name: "Plan vacation" });
    await userEvent.click(planVacationButton);

    expect(screen.getByText("some error")).toBeInTheDocument();
    const banner = queryHelpers.queryAllByAttribute("data-banner-message-type", document.body, "error")[0];
    userEvent.click(within(banner).getByRole("button"));
  });

  test("should navigate to page with table calendar, when cancel button clicked in plan vacation page", async () => {
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
