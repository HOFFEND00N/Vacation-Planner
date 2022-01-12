import { BodyReducerStateType, reducer, errorOccurred, UserDataLoaded } from "../reducer";

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
        type: "set user data",
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
        type: "set error",
        error: {
          message: "message",
          name: "",
          stack: "",
        },
      }
    );

    expect(actualState).toEqual(expectedState);
  });

  test("throw error because of invalid action type", () => {
    expect(() =>
      reducer(
        {},
        {
          type: "unknown command",
        }
      )
    ).toThrow();
  });

  test("add set error action type, when set error called", () => {
    const expectedAction = {
      type: "set error",
      error: {
        message: "message",
        name: "",
        stack: "",
      },
    };

    const actualAction = errorOccurred({
      message: "message",
      name: "",
      stack: "",
    });

    expect(actualAction).toEqual(expectedAction);
  });

  test("add set user data, when set user data loaded", () => {
    const expectedAction = {
      type: "set user data",
      currentUser: { id: "user 1", name: "user 1" },
      teamMembers: [
        { id: "user 1", name: "user 1" },
        { id: "user 2", name: "user 2" },
      ],
      vacations: [],
    };

    const actualAction = UserDataLoaded({
      currentUser: { id: "user 1", name: "user 1" },
      teamMembers: [
        { id: "user 1", name: "user 1" },
        { id: "user 2", name: "user 2" },
      ],
      vacations: [],
    });

    expect(actualAction).toEqual(expectedAction);
  });
});
