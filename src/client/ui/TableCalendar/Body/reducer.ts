import { User, Vacation } from "../../../../sharedKernel";

export type BodyReducerStateType = {
  error?: Error;
  teamMembers?: User[];
  currentUser?: User;
  vacations?: Vacation[];
};

export enum ReducerActionTypes {
  UserDataLoaded = "user data loaded",
  ErrorOccurred = "error occurred",
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

export type BodyReducerActionType = UserDataLoadedAction | ErrorOccurredAction;

export const reducer = (state: BodyReducerStateType, action: BodyReducerActionType): BodyReducerStateType => {
  switch (action.type) {
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
