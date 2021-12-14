import { User, Vacation, VacationType } from "./domain/types";

export type VacationTypeByDay = Record<number, VacationType>;

export type VacationInterval = {
  start: number;
  end: number;
};

export type BodyReducerStateType = {
  isDataFetched: boolean;
  teamMembers: User[];
  currentUser: User;
  vacations: Vacation[];
};

export type BodyReducerActionType = BodyReducerStateType & { type: string };
