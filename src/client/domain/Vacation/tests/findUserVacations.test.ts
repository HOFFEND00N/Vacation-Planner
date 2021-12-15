import { findUserVacations } from "../findUserVacations";
import { Vacation, VacationType } from "../../types";

//case when vacation starts in one year and ends in another is impossible
describe("find user vacations", () => {
  test("should return empty array, when nothing passed", () => {
    const expectedVacations: Vacation[] = [];

    const actualVacations = findUserVacations({ vacations: [], userId: "1", year: 1 });

    expect(actualVacations).toEqual(expectedVacations);
  });

  test("should return empty array, when no vacations for specified user passed", () => {
    const expectedVacations: Vacation[] = [];

    const actualVacations = findUserVacations({
      vacations: [
        {
          start: new Date("1-1-2021"),
          end: new Date("1-11-2021"),
          userId: "2",
          type: VacationType.APPROVED,
          id: "vacation 1",
        },
      ],
      userId: "1",
      year: 1,
    });

    expect(actualVacations).toEqual(expectedVacations);
  });

  test("should return empty array, when vacations for specified user passed for different year", () => {
    const expectedVacations: Vacation[] = [];

    const actualVacations = findUserVacations({
      vacations: [
        {
          start: new Date("1-1-2020"),
          end: new Date("1-11-2020"),
          userId: "1",
          type: VacationType.APPROVED,
          id: "vacation 1",
        },
      ],
      userId: "1",
      year: 2021,
    });

    expect(actualVacations).toEqual(expectedVacations);
  });

  test("should return one vacation, when vacations for specified user passed", () => {
    const expectedVacations: Vacation[] = [
      {
        start: new Date("1-1-2021"),
        end: new Date("1-11-2021"),
        userId: "1",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
    ];

    const actualVacations = findUserVacations({
      vacations: [
        {
          start: new Date("1-1-2021"),
          end: new Date("1-11-2021"),
          userId: "1",
          type: VacationType.APPROVED,
          id: "vacation 1",
        },
      ],
      userId: "1",
      year: 2021,
    });

    expect(actualVacations).toEqual(expectedVacations);
  });

  test("should return two vacations, when vacations for specified user passed", () => {
    const expectedVacations: Vacation[] = [
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
        type: VacationType.APPROVED,
        id: "vacation 2",
      },
    ];

    const actualVacations = findUserVacations({
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
          type: VacationType.APPROVED,
          id: "vacation 2",
        },
      ],
      userId: "1",
      year: 2021,
    });

    expect(actualVacations).toEqual(expectedVacations);
  });

  test("should return one vacation, when vacations for different users passed", () => {
    const expectedVacations: Vacation[] = [
      {
        start: new Date("1-1-2021"),
        end: new Date("1-11-2021"),
        userId: "1",
        type: VacationType.APPROVED,
        id: "vacation 1",
      },
    ];

    const actualVacations = findUserVacations({
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
          userId: "2",
          type: VacationType.APPROVED,
          id: "vacation 2",
        },
      ],
      userId: "1",
      year: 2021,
    });

    expect(actualVacations).toEqual(expectedVacations);
  });
});
