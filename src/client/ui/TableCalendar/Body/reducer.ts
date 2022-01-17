import { User, Vacation } from "../../../domain/types";

export type BodyReducerStateType = {
  error?: Error;
  teamMembers?: User[];
  currentUser?: User;
  vacations?: Vacation[];
};

export enum reducerActionTypes {
  UserDataLoaded = "user data loaded",
  ErrorOccurred = "error occurred",
  UserDataLoading = "user data loading",
}

export type errorOccurredAction = {
  type: reducerActionTypes.ErrorOccurred;
  error: Error;
};

export type userDataLoadedAction = {
  type: reducerActionTypes.UserDataLoaded;
  teamMembers: User[];
  currentUser: User;
  vacations: Vacation[];
};

export type userDataLoadingAction = {
  type: reducerActionTypes.UserDataLoading;
};

export type BodyReducerActionType = userDataLoadedAction | errorOccurredAction | userDataLoadingAction;

export const reducer = (state: BodyReducerStateType, action: BodyReducerActionType) => {
  switch (action.type) {
    case reducerActionTypes.UserDataLoaded: {
      return {
        teamMembers: action.teamMembers,
        currentUser: action.currentUser,
        vacations: action.vacations,
      };
    }
    case reducerActionTypes.ErrorOccurred: {
      return {
        error: action.error,
      };
    }
    case reducerActionTypes.UserDataLoading:
      return {};
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
}): userDataLoadedAction => ({
  type: reducerActionTypes.UserDataLoaded,
  teamMembers,
  currentUser,
  vacations,
});

export const errorOccurred = (error: Error): errorOccurredAction => ({
  type: reducerActionTypes.ErrorOccurred,
  error,
});
