import { queryHelpers, render, screen, within } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import moment from "moment";
import userEvent from "@testing-library/user-event";
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
        date: new Date("11-2-2021"),
      },
      vacationEnd: {
        date: new Date("11-14-2021"),
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
    expect(within(screen.getByTestId("application")).getByText(`???? ${expectedFullName}`)).toBeInTheDocument();
  });

  test("should have default additional vacation days value in application = 1", () => {
    render(<PlanVacation currentDate={moment("1-10-2021", "DD-MM-YYYY")} />);

    const checkbox = screen.getByRole("checkbox");
    userEvent.click(checkbox);

    expect(
      within(screen.getByTestId("application")).getByText(
        "?????????? ???????????????????????? ?????? ???????????? ?? 02.11.2021 ???? 14.11.2021, ???? ?????? 1 ???????????????????????????? ???????? ?????????????? ???? 2021 ??????"
      )
    ).toBeInTheDocument();
  });

  test("should change additional vacation days in application, when enter value in 1 < textbox < 5", () => {
    render(<PlanVacation currentDate={moment("1-10-2021", "DD-MM-YYYY")} />);

    const checkbox = screen.getByRole("checkbox");
    userEvent.click(checkbox);

    const additionalVacationDaysElement = screen.getByTestId("additional-vacation-days");
    const input = within(additionalVacationDaysElement).getByDisplayValue("1");
    userEvent.type(input, "{backspace}");
    userEvent.type(input, "3");
    expect(
      within(screen.getByTestId("application")).getByText(
        "?????????? ???????????????????????? ?????? ???????????? ?? 02.11.2021 ???? 14.11.2021, ???? ?????? 3 ???????????????????????????? ?????? ?????????????? ???? 2021 ??????"
      )
    ).toBeInTheDocument();
  });

  test("should change additional vacation days in application, when enter value in textbox > 5", () => {
    render(<PlanVacation currentDate={moment("1-10-2021", "DD-MM-YYYY")} />);

    const checkbox = screen.getByRole("checkbox");
    userEvent.click(checkbox);

    const additionalVacationDaysElement = screen.getByTestId("additional-vacation-days");

    const input = within(additionalVacationDaysElement).getByDisplayValue("1");
    userEvent.type(input, "{backspace}");
    userEvent.type(input, "5");
    expect(
      within(screen.getByTestId("application")).getByText(
        "?????????? ???????????????????????? ?????? ???????????? ?? 02.11.2021 ???? 14.11.2021, ???? ?????? 5 ???????????????????????????? ???????? ?????????????? ???? 2021 ??????"
      )
    ).toBeInTheDocument();
  });

  test("should show and hide additional vacation days input, when checkbox toggled 2 times respectively", () => {
    render(<PlanVacation currentDate={moment("1-10-2021", "DD-MM-YYYY")} />);

    const additionalVacationDaysElement = screen.getByTestId("additional-vacation-days");
    const checkbox = screen.getByRole("checkbox");
    userEvent.click(checkbox);
    expect(within(additionalVacationDaysElement).getByDisplayValue("1")).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(within(additionalVacationDaysElement).queryByDisplayValue("1")).not.toBeInTheDocument();
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
