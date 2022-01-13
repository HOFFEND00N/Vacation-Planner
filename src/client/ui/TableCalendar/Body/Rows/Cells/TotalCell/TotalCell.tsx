import React from "react";
import cn from "classnames";
import "./total-cell.css";
import { WorkloadType } from "../../../../../../types";
import { Cell } from "../Cell";

type CellProps = {
  classNames?: string;
  isDaysColumn?: boolean;
  workloadType?: WorkloadType;
  value?: string;
};

export const TotalCell = ({ isDaysColumn, classNames, workloadType, value }: CellProps) => {
  const cellClassNames = cn({
    [`${classNames}`]: !!classNames,
    ["total-cell--weak-workload"]: WorkloadType.Weak === workloadType,
    ["total-cell--medium-workload"]: WorkloadType.Medium === workloadType,
    ["total-cell--heavy-workload"]: WorkloadType.Heavy === workloadType,
  });

  return <Cell isDaysColumn={isDaysColumn} classNames={cellClassNames} data-testid="table-cell" value={value} />;
};
