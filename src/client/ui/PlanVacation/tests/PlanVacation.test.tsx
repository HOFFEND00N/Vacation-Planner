import { act, queryHelpers, render, screen, within } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import moment from "moment";
import userEvent from "@testing-library/user-event";
import { store } from "@confirmit/react-banner";
import { PlanVacation } from "../PlanVacation";
import { planVacation } from "../../../application/planVacation";

jest.mock("@confirmit/react-banner", () => ({
  store: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn().mockReturnValue({
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
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));
jest.mock("../../../constants.ts", () => {
  return {};
});
jest.mock("../../../application/planVacation");

describe("PlanVacation", () => {
  test("should render", () => {
    render(<PlanVacation currentDate={moment("1-10-2021", "DD-MM-YYYY")} />);

    expect(screen.getByTestId("vacation-dates")).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Full name in the genitive case" })).toBeInTheDocument();
    expect(screen.getByText("Use additional vacation days")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Print application" })).toBeInTheDocument();
    expect(screen.getByText("Upload a vacation application *")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Plan vacation" })).toBeInTheDocument();
    expect(screen.getByTestId("application")).toBeInTheDocument();
    expect(screen.queryByTestId("additional-vacation-days-input")).not.toBeInTheDocument();
  });

  test("should change full name in application, when value in text box changed", () => {
    const expectedFullName = "last name";
    render(<PlanVacation currentDate={moment("1-10-2021", "DD-MM-YYYY")} />);

    const fullNameElement = screen.getByTestId("full-name-input");
    const input = within(fullNameElement).getByRole("textbox");
    userEvent.type(input, expectedFullName);
    expect(within(screen.getByTestId("application")).getByText(`от ${expectedFullName}`)).toBeInTheDocument();
  });

  test("should change start date in application, when value in date picker changed", () => {
    const component = render(<PlanVacation currentDate={moment("1-10-2021", "DD-MM-YYYY")} />);

    userEvent.click(screen.getByTestId("start-date-picker"));
    const popover = queryHelpers.queryAllByAttribute("data-popover", component.baseElement as HTMLElement, /.*/)[0];
    userEvent.click(within(popover).getByText("1"));

    expect(
      within(screen.getByTestId("application")).getByText("Прошу предоставить мне отпуск с 01.11.2021 до 14.11.2021")
    ).toBeInTheDocument();
  });

  test("should change end date in application, when value in date picker changed", () => {
    const component = render(<PlanVacation currentDate={moment("1-10-2021", "DD-MM-YYYY")} />);

    userEvent.click(screen.getByTestId("end-date-picker"));
    const popover = queryHelpers.queryAllByAttribute("data-popover", component.baseElement as HTMLElement, /.*/)[0];
    userEvent.click(within(popover).getByText("21"));

    expect(
      within(screen.getByTestId("application")).getByText("Прошу предоставить мне отпуск с 02.11.2021 до 21.11.2021")
    ).toBeInTheDocument();
  });

  test("should change additional vacation days in application, when enter value in textbox = 1", () => {
    render(<PlanVacation currentDate={moment("1-10-2021", "DD-MM-YYYY")} />);

    const checkbox = screen.getByRole("checkbox");
    userEvent.click(checkbox);

    const additionalVacationDaysElement = screen.getByTestId("additional-vacation-days");
    userEvent.type(within(additionalVacationDaysElement).getByRole("textbox"), "1");
    expect(
      within(screen.getByTestId("application")).getByText(
        "Прошу предоставить мне отпуск с 02.11.2021 до 14.11.2021, из них 1 дополнительный день отпуска за 2021 год"
      )
    ).toBeInTheDocument();
  });

  test("should change additional vacation days in application, when enter value in 1 < textbox < 5", () => {
    render(<PlanVacation currentDate={moment("1-10-2021", "DD-MM-YYYY")} />);

    const checkbox = screen.getByRole("checkbox");
    userEvent.click(checkbox);

    const additionalVacationDaysElement = screen.getByTestId("additional-vacation-days");
    userEvent.type(within(additionalVacationDaysElement).getByRole("textbox"), "3");
    expect(
      within(screen.getByTestId("application")).getByText(
        "Прошу предоставить мне отпуск с 02.11.2021 до 14.11.2021, из них 3 дополнительных дня отпуска за 2021 год"
      )
    ).toBeInTheDocument();
  });

  test("should change additional vacation days in application, when enter value in textbox > 5", () => {
    render(<PlanVacation currentDate={moment("1-10-2021", "DD-MM-YYYY")} />);

    const checkbox = screen.getByRole("checkbox");
    userEvent.click(checkbox);

    const additionalVacationDaysElement = screen.getByTestId("additional-vacation-days");
    userEvent.type(within(additionalVacationDaysElement).getByRole("textbox"), "5");
    expect(
      within(screen.getByTestId("application")).getByText(
        "Прошу предоставить мне отпуск с 02.11.2021 до 14.11.2021, из них 5 дополнительных дней отпуска за 2021 год"
      )
    ).toBeInTheDocument();
  });

  test("should show and hide additional vacation days input, when checkbox toggled 2 times respectively", () => {
    render(<PlanVacation currentDate={moment("1-10-2021", "DD-MM-YYYY")} />);

    const additionalVacationDaysElement = screen.getByTestId("additional-vacation-days");
    const checkbox = screen.getByRole("checkbox");
    userEvent.click(checkbox);
    expect(within(additionalVacationDaysElement).getByRole("textbox")).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(within(additionalVacationDaysElement).queryByRole("textbox")).not.toBeInTheDocument();
  });

  test("should show success, when plan vacation button clicked with uploaded application scan", async () => {
    (planVacation as jest.Mock).mockImplementation(jest.fn());
    const mockSuccess = jest.fn();
    (store.success as jest.Mock).mockImplementation(mockSuccess);

    const component = render(<PlanVacation currentDate={moment("1-10-2021", "DD-MM-YYYY")} />);
    const input = queryHelpers.queryAllByAttribute(
      "data-test",
      component.baseElement as HTMLElement,
      "dropzone-file-input"
    )[0] as HTMLInputElement;
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    userEvent.upload(input, file);

    const planVacationButton = screen.getByRole("button", { name: "Plan vacation" });
    await act(async () => {
      await userEvent.click(planVacationButton);
    });

    expect(mockSuccess).toBeCalledTimes(1);
    expect(screen.getByText("hello.png")).toBeInTheDocument();
  });

  test("should show error, when plan vacation failed", async () => {
    (planVacation as jest.Mock).mockImplementation(
      jest.fn(() => {
        throw Error("some error");
      })
    );
    const mockError = jest.fn();
    (store.error as jest.Mock).mockImplementation(mockError);

    const component = render(<PlanVacation currentDate={moment("1-10-2021", "DD-MM-YYYY")} />);
    const input = queryHelpers.queryAllByAttribute(
      "data-test",
      component.baseElement as HTMLElement,
      "dropzone-file-input"
    )[0] as HTMLInputElement;
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    userEvent.upload(input, file);

    const planVacationButton = screen.getByRole("button", { name: "Plan vacation" });
    await act(async () => {
      await userEvent.click(planVacationButton);
    });

    expect(mockError).toBeCalledTimes(1);
    expect(screen.getByText("hello.png")).toBeInTheDocument();
  });

  test("should remove uploaded scan, when user clicked on clear file button", async () => {
    (planVacation as jest.Mock).mockImplementation(jest.fn());
    const component = render(<PlanVacation currentDate={moment("1-10-2021", "DD-MM-YYYY")} />);

    const input = queryHelpers.queryAllByAttribute(
      "data-test",
      component.baseElement as HTMLElement,
      "dropzone-file-input"
    )[0];
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    userEvent.upload(input, file);

    const clearFileButton = queryHelpers.queryAllByAttribute(
      "data-test",
      component.baseElement as HTMLElement,
      "dropzone-clear-file"
    )[0];

    await userEvent.click(clearFileButton);
    expect(screen.queryByText("hello.png")).not.toBeInTheDocument();
  });
});
