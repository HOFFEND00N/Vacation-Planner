import { User, Vacation } from "../../../domain/types";

export type BodyReducerStateType = {
  error?: Error;
  teamMembers?: User[];
  currentUser?: User;
  vacations?: Vacation[];
};

export type BodyReducerActionType = BodyReducerStateType & { type: string };

export const reducer = (state: BodyReducerStateType, action: BodyReducerActionType): BodyReducerStateType => {
  switch (action.type) {
    case "set user data": {
      return {
        teamMembers: action.teamMembers,
        currentUser: action.currentUser,
        vacations: action.vacations,
      };
    }
    case "set error": {
      return {
        error: action.error,
      };
    }
    default: {
      throw new Error();
    }
  }
};

export const setUserData = ({
  teamMembers,
  currentUser,
  vacations,
}: {
  teamMembers: User[];
  currentUser: User;
  vacations: Vacation[];
}) => ({
  type: "set user data",
  teamMembers,
  currentUser,
  vacations,
});

export const setError = ({ error }: { error: Error }) => ({
  type: "set error",
  error,
});
