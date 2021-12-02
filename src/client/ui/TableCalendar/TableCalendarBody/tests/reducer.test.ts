import { initialState, reducer, StateType } from "../reducer";

describe("reducer", () => {
  test("updates state correctly", () => {
    const expectedState: StateType = {
      isDataFetched: true,
      currentUser: { id: "user 1", name: "user 1" },
      teamMembers: [
        { id: "user 1", name: "user 1" },
        { id: "user 2", name: "user 2" },
      ],
      vacations: [],
    };

    const actualState = reducer(initialState, {
      type: "set state",
      isDataFetched: true,
      currentUser: { id: "user 1", name: "user 1" },
      teamMembers: [
        { id: "user 1", name: "user 1" },
        { id: "user 2", name: "user 2" },
      ],
      vacations: [],
    });

    expect(actualState).toEqual(expectedState);
  });

  test("throw error because of invalid action type", () => {
    expect(() =>
      reducer(initialState, {
        type: "unknown command",
        isDataFetched: false,
        currentUser: { id: "", name: "" },
        teamMembers: [],
        vacations: [],
      })
    ).toThrow();
  });
});
