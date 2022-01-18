import { BodyReducerStateType, reducer, reducerActionTypes } from "../reducer";

describe("reducer", () => {
  test("updates state correctly, when data loaded", () => {
    const expectedState: BodyReducerStateType = {
      currentUser: { id: "user 1", name: "user 1" },
      teamMembers: [
        { id: "user 1", name: "user 1" },
        { id: "user 2", name: "user 2" },
      ],
      vacations: [],
    };

    const actualState = reducer(
      {},
      {
        type: reducerActionTypes.UserDataLoaded,
        currentUser: { id: "user 1", name: "user 1" },
        teamMembers: [
          { id: "user 1", name: "user 1" },
          { id: "user 2", name: "user 2" },
        ],
        vacations: [],
      }
    );

    expect(actualState).toEqual(expectedState);
  });

  test("set error, when data did not loaded", () => {
    const expectedState: BodyReducerStateType = {
      error: {
        message: "message",
        name: "",
        stack: "",
      },
    };

    const actualState = reducer(
      {},
      {
        type: reducerActionTypes.ErrorOccurred,
        error: {
          message: "message",
          name: "",
          stack: "",
        },
      }
    );

    expect(actualState).toEqual(expectedState);
  });
});
