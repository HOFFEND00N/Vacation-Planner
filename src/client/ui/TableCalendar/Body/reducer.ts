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

export const loadData = ({ isDataFetched, teamMembers, currentUser, vacations }) => ({
  type: "load user data",
  isDataFetched,
  teamMembers,
  currentUser,
  vacations,
});

export const bodyReducerInitialState: BodyReducerStateType = {
  isDataFetched: false,
  teamMembers: [],
  currentUser: { id: "", name: "" },
  vacations: [],
};
