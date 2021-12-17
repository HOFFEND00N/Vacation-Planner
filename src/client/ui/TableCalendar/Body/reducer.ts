import { User, Vacation } from "../../../domain/types";

export type BodyReducerStateType = {
  isDataFetched: boolean;
  teamMembers: User[];
  currentUser: User;
  vacations: Vacation[];
};

export type BodyReducerActionType = BodyReducerStateType & { type: string };

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
