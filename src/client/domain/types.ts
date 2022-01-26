import { VacationType } from "../../sharedKernel";

export type User = {
  name: string;
  id: string;
};
export type Vacation = {
  id: string;
  start: Date;
  end: Date;
  userId: string;
  type: VacationType;
};

export type VacationCountByDays = Record<number, number>;
