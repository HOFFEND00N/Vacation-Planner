import {
  BodyReducerStateType,
  reducer,
  ReducerActionTypes,
  vacationCanceled,
  VacationCanceledAction,
} from "../reducer";
import { VacationType } from "../../../../../shared";

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
        type: ReducerActionTypes.UserDataLoaded,
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
        type: ReducerActionTypes.ErrorOccurred,
        error: {
          message: "message",
          name: "",
          stack: "",
        },
      }
    );

    expect(actualState).toEqual(expectedState);
  });

  test("update state correctly, when vacation canceled", () => {
    const expectedState: BodyReducerStateType = {
      currentUser: { id: "user 1", name: "user 1" },
      teamMembers: [
        { id: "user 1", name: "user 1" },
        { id: "user 2", name: "user 2" },
      ],
      vacations: [
        {
          start: new Date("1-1-2021"),
          end: new Date("1-11-2021"),
          userId: "1",
          type: VacationType.APPROVED,
          id: "vacation 1",
        },
      ],
    };

    const actualState = reducer(
      {
        currentUser: { id: "user 1", name: "user 1" },
        teamMembers: [
          { id: "user 1", name: "user 1" },
          { id: "user 2", name: "user 2" },
        ],
        vacations: [
          {
            start: new Date("1-1-2021"),
            end: new Date("1-11-2021"),
            userId: "1",
            type: VacationType.APPROVED,
            id: "vacation 1",
          },
          {
            start: new Date("1-21-2021"),
            end: new Date("1-28-2021"),
            userId: "1",
            type: VacationType.PENDING_APPROVAL,
            id: "vacation 2",
          },
        ],
      },
      {
        type: ReducerActionTypes.VacationCanceled,
        currentUser: { id: "user 1", name: "user 1" },
        teamMembers: [
          { id: "user 1", name: "user 1" },
          { id: "user 2", name: "user 2" },
        ],
        vacations: [
          {
            start: new Date("1-1-2021"),
            end: new Date("1-11-2021"),
            userId: "1",
            type: VacationType.APPROVED,
            id: "vacation 1",
          },
        ],
      }
    );

    expect(actualState).toEqual(expectedState);
  });

  test("remove canceled vacation from vacation list", () => {
    const expectedState: VacationCanceledAction = {
      type: ReducerActionTypes.VacationCanceled,
      currentUser: { id: "", name: "" },
      teamMembers: [],
      vacations: [
        {
          start: new Date("1-1-2021"),
          end: new Date("1-11-2021"),
          userId: "1",
          type: VacationType.APPROVED,
          id: "vacation 1",
        },
      ],
    };

    const actualState = vacationCanceled({
      currentUser: { id: "", name: "" },
      teamMembers: [],
      vacations: [
        {
          start: new Date("1-1-2021"),
          end: new Date("1-11-2021"),
          userId: "1",
          type: VacationType.APPROVED,
          id: "vacation 1",
        },
        {
          start: new Date("1-21-2021"),
          end: new Date("1-28-2021"),
          userId: "1",
          type: VacationType.PENDING_APPROVAL,
          id: "vacation 2",
        },
      ],
      canceledVacationId: "vacation 2",
    });

    expect(actualState).toEqual(expectedState);
  });
});
