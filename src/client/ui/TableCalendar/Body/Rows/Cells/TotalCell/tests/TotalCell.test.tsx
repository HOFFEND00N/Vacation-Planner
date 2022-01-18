import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { TotalCell } from "../TotalCell";
import { WorkloadType } from "../../../../../../../types";

describe("TotalCell ", () => {
  test("should render", async () => {
    render(<TotalCell workloadType={WorkloadType.Weak} />);

    expect(screen.getByTestId("table-cell")).toBeInTheDocument();
  });

  test("should have weak workload className, when WorkloadType = Weak", async () => {
    const expectedClassName = "total-cell--weak-workload";

    render(<TotalCell workloadType={WorkloadType.Weak} />);

    expect(screen.getByTestId("table-cell").classList.contains(expectedClassName)).toEqual(true);
  });

  test("should have weak workload className, when WorkloadType = Medium", async () => {
    const expectedClassName = "total-cell--medium-workload";

    render(<TotalCell workloadType={WorkloadType.Medium} />);

    expect(screen.getByTestId("table-cell").classList.contains(expectedClassName)).toEqual(true);
  });

  test("should have weak workload className, when WorkloadType = Heavy", async () => {
    const expectedClassName = "total-cell--heavy-workload";

    render(<TotalCell workloadType={WorkloadType.Heavy} />);

    expect(screen.getByTestId("table-cell").classList.contains(expectedClassName)).toEqual(true);
  });
});
