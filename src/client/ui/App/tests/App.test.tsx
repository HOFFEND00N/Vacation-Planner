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
import { VacationType } from "../../../../shared";
import { cancelUnapprovedVacation } from "../../../application/cancelUnapprovedVacation";

jest.mock("../../../application/getVacations");
jest.mock("../../../application/getTeamMembers");
jest.mock("../../../application/planVacation");
jest.mock("../../../application/cancelUnapprovedVacation");
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
        <App currentDate={moment("1-11-2021", "DD-MM-YYYY")} />
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
      within(screen.getByTestId("application")).getByText("Прошу предоставить мне отпуск с 02.11.2021 до 02.11.2021")
    ).toBeInTheDocument();
  });

  test("should render App, show error, when server interaction fails", async () => {
    (getTeamMembers as jest.Mock).mockImplementation(() => {
      throw new Error("some error");
    });
    (getVacations as jest.Mock).mockReturnValue([]);

    render(
      <MemoryRouter>
        <App currentDate={moment("1-11-2021", "DD-MM-YYYY")} />
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
        <App currentDate={moment("1-11-2021", "DD-MM-YYYY")} />
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
    await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));
    expect(screen.getByTestId("table-calendar")).toBeInTheDocument();
    const banner = queryHelpers.queryAllByAttribute("data-banner-message-type", document.body, "success")[0];
    userEvent.click(within(banner).getByRole("button"));
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
        <App currentDate={moment("1-11-2021", "DD-MM-YYYY")} />
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
            date: new Date("11-2-2021"),
          },
          vacationEnd: {
            date: new Date("11-14-2021"),
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
        <App currentDate={moment("1-11-2021", "DD-MM-YYYY")} />
      </MemoryRouter>
    );

    const CancelButton = screen.getByRole("button", { name: "Cancel" });
    userEvent.click(CancelButton);

    expect(screen.queryByTestId("application-form-container")).not.toBeInTheDocument();
    expect(screen.getByText("Please wait, searching your teammates...")).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));
    expect(screen.getByTestId("table-calendar-body")).toBeInTheDocument();
  });

  test("should render App, then fail to cancel unapproved vacation and show error", async () => {
    (getTeamMembers as jest.Mock).mockReturnValue({
      teamMembers: [
        { id: "user 2", name: "user 2" },
        { id: "user 1", name: "user 1" },
      ],
      currentUser: { id: "user 1", name: "user 1" },
    });
    (getVacations as jest.Mock).mockReturnValue([
      {
        start: new Date("1-1-2021"),
        end: new Date("1-11-2021"),
        userId: "user 1",
        type: VacationType.PENDING_APPROVAL,
        id: "vacation 1",
      },
    ]);
    (cancelUnapprovedVacation as jest.Mock).mockImplementation(() => {
      throw Error("Something went wrong, please try again later");
    });

    render(
      <MemoryRouter>
        <App currentDate={moment("1-11-2021", "DD-MM-YYYY")} />
      </MemoryRouter>,
      { container: document.body }
    );

    await waitForElementToBeRemoved(screen.getByText("Please wait, searching your teammates..."));

    const cancelVacationButton = screen.getByText("Cancel vacation");
    expect(screen.queryByText("Fri Jan 01 2021 - Mon Jan 11 2021")).toBeInTheDocument();
    userEvent.click(cancelVacationButton);
    userEvent.click(screen.getByRole("button", { name: "Yes" }));

    expect(screen.getByText("Something went wrong, please try again later")).toBeInTheDocument();
    expect(screen.queryByText("Fri Jan 01 2021 - Mon Jan 11 2021")).toBeInTheDocument();
    expect(screen.getByText("Cancel vacation")).toBeInTheDocument();
    const banner = queryHelpers.queryAllByAttribute("data-banner-message-type", document.body, "error")[0];
    userEvent.click(within(banner).getByRole("button"));
  });
});
