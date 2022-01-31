import { VacationType } from "../shared";

export type VacationTypeByDay = Record<number, VacationType>;

export type VacationInterval = {
  start: number;
  end: number;
};

export enum HttpMethod {
  GET = "get",
  POST = "post",
  DELETE = "delete",
}

export enum WorkloadType {
  "Weak" = "Weak",
  "Medium" = "Medium",
  "Heavy" = "Heavy",
}
