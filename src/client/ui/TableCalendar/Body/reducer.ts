import { BodyReducerActionType, BodyReducerStateType } from "../../../types";

export const reducer = (state: BodyReducerStateType, action: BodyReducerActionType): BodyReducerStateType => {
  switch (action.type) {
    case "load user data": {
      return {
        isDataFetched: true,
        teamMembers: action.teamMembers,
        currentUser: action.currentUser,
        vacations: action.vacations,
      };
    }
    default: {
      throw new Error();
    }
  }
};

export const bodyReducerInitialState: BodyReducerStateType = {
  isDataFetched: false,
  teamMembers: [],
  currentUser: { id: "", name: "" },
  vacations: [],
};
