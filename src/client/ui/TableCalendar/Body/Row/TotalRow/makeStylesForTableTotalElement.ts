import "../../body.css";
import cn from "classnames";
import { WorkloadType } from "../../../../../types";

export const makeStylesForTableTotalElement = (dayWorkloadType: WorkloadType) => {
  return cn({
    ["row__total-cell--weak-workload"]: WorkloadType.Weak === dayWorkloadType,
    ["row__total-cell--medium-workload"]: WorkloadType.Medium === dayWorkloadType,
    ["row__total-cell--heavy-workload"]: WorkloadType.Heavy === dayWorkloadType,
  });
};
