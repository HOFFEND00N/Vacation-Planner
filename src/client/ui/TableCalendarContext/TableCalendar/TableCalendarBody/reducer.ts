import { User } from "../../../../domain/user";
import { Vacation } from "../../../../domain/vacation";

export type StateType = {
  isDataFetched: boolean;
  teamMembers: User[];
  currentUser: User;
  vacations: Vacation[];
};

export type ActionType = StateType & { type: string };

export const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "set state": {
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

export const initialState: StateType = {
  isDataFetched: false,
  teamMembers: [],
  currentUser: { id: "", name: "" },
  vacations: [],
};
