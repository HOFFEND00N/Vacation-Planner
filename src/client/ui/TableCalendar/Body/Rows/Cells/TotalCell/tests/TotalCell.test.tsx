import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { TotalCell } from "../TotalCell";
import { WorkloadType } from "../../../../../../../types";

describe("TotalCell ", () => {
  test("should render", async () => {
    render(<TotalCell value="test value" />);

    expect(screen.getByText("test value")).toBeInTheDocument();
  });

  test("should have weak workload className, when WorkloadType = Weak", async () => {
    const expectedClassName = "total-cell--weak-workload";

    render(<TotalCell value="test value" workloadType={WorkloadType.Weak} />);

    expect(screen.getByText("test value").classList.contains(expectedClassName)).toEqual(true);
  });

  test("should have weak workload className, when WorkloadType = Medium", async () => {
    const expectedClassName = "total-cell--medium-workload";

    render(<TotalCell value="test value" workloadType={WorkloadType.Medium} />);

    expect(screen.getByText("test value").classList.contains(expectedClassName)).toEqual(true);
  });

  test("should have weak workload className, when WorkloadType = Heavy", async () => {
    const expectedClassName = "total-cell--heavy-workload";

    render(<TotalCell value="test value" workloadType={WorkloadType.Heavy} />);

    expect(screen.getByText("test value").classList.contains(expectedClassName)).toEqual(true);
  });
});
