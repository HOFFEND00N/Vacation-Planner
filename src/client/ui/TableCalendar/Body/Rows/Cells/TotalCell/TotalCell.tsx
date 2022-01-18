import React from "react";
import cn from "classnames";
import "./total-cell.css";
import { WorkloadType } from "../../../../../../types";
import { Cell } from "../Cell";

export const TotalCell = ({ workloadType }: { workloadType: WorkloadType }) => {
  const cellClassNames = cn({
    ["total-cell--weak-workload"]: WorkloadType.Weak === workloadType,
    ["total-cell--medium-workload"]: WorkloadType.Medium === workloadType,
    ["total-cell--heavy-workload"]: WorkloadType.Heavy === workloadType,
  });

  return <Cell classNames={cellClassNames} />;
};
