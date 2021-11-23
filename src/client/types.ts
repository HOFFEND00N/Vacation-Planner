import { VacationType } from "./domain/vacation";

export type VacationTypeByDay = Record<number, VacationType>;

export type VacationInterval = {
  start: number;
  end: number;
};
