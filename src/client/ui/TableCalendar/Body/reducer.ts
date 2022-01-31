import { User, Vacation } from "../../../../shared";

export type BodyReducerStateType = {
  error?: Error;
  teamMembers?: User[];
  currentUser?: User;
  vacations?: Vacation[];
};

export enum ReducerActionTypes {
  UserDataLoaded = "user data loaded",
  ErrorOccurred = "error occurred",
  VacationCanceled = "cancel vacation",
}

export type ErrorOccurredAction = {
  type: ReducerActionTypes.ErrorOccurred;
  error: Error;
};

export type UserDataLoadedAction = {
  type: ReducerActionTypes.UserDataLoaded;
  teamMembers: User[];
  currentUser: User;
  vacations: Vacation[];
};

export type BodyReducerActionType = UserDataLoadedAction | ErrorOccurredAction | VacationCanceledAction;

export type VacationCanceledAction = {
  type: ReducerActionTypes.VacationCanceled;
  teamMembers: User[];
  currentUser: User;
  vacations: Vacation[];
};

export const reducer = (state: BodyReducerStateType, action: BodyReducerActionType): BodyReducerStateType => {
  switch (action.type) {
    case ReducerActionTypes.VacationCanceled:
    case ReducerActionTypes.UserDataLoaded: {
      return {
        teamMembers: action.teamMembers,
        currentUser: action.currentUser,
        vacations: action.vacations,
      };
    }
    case ReducerActionTypes.ErrorOccurred: {
      return {
        error: action.error,
      };
    }
  }
};

export const userDataLoaded = ({
  teamMembers,
  currentUser,
  vacations,
}: {
  teamMembers: User[];
  currentUser: User;
  vacations: Vacation[];
}): UserDataLoadedAction => ({
  type: ReducerActionTypes.UserDataLoaded,
  teamMembers,
  currentUser,
  vacations,
});

export const errorOccurred = (error: Error): ErrorOccurredAction => ({
  type: ReducerActionTypes.ErrorOccurred,
  error,
});

export const vacationCanceled = ({
  vacations,
  canceledVacationId,
  teamMembers,
  currentUser,
}: {
  vacations: Vacation[];
  canceledVacationId: string;
  teamMembers: User[];
  currentUser: User;
}): VacationCanceledAction => {
  return {
    vacations: vacations.filter((vacation) => vacation.id !== canceledVacationId),
    teamMembers,
    currentUser,
    type: ReducerActionTypes.VacationCanceled,
  };
};
