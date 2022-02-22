import { render, screen } from "@testing-library/react";
import React from "react";
import { UserVacations } from "../UserVacations";
import "@testing-library/jest-dom";
import { VacationType } from "../../../../../shared";

jest.mock("../../../../constants.ts", () => {
  return {};
});

describe("UserVacations", () => {
  test("should render, when vacations passed", () => {
    render(
      <UserVacations
        vacations={[
          {
            start: new Date("1-1-2021"),
            end: new Date("1-11-2021"),
            userId: "user 1",
            type: VacationType.PENDING_APPROVAL,
            id: "vacation 1",
          },
        ]}
        onVacationCancel={jest.fn()}
      />
    );

    expect(screen.getByText("Your unapproved vacations:")).toBeInTheDocument();
    expect(screen.queryByText("Fri Jan 01 2021 - Mon Jan 11 2021")).toBeInTheDocument();
    expect(screen.getByText("Cancel vacation")).toBeInTheDocument();
  });

  test("should not render, when no vacations passed", () => {
    render(<UserVacations vacations={[]} onVacationCancel={jest.fn()} />);

    expect(screen.queryByText("Your vacations:")).not.toBeInTheDocument();
    expect(screen.queryByText("Cancel vacation")).not.toBeInTheDocument();
  });
});
