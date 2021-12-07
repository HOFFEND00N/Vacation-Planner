import { getDateDifferenceInDays } from "../getDateDifferenceInDays";

describe("get date difference in days", () => {
  test("pass the same dates, expect to return 1", () => {
    const expectedDateDifferenceInDays = 1;

    const actualDateDifferenceInDays = getDateDifferenceInDays({
      start: new Date("1-11-2021"),
      end: new Date("1-11-2021"),
    });

    expect(actualDateDifferenceInDays).toEqual(expectedDateDifferenceInDays);
  });

  test("pass different dates, expect to return 2", () => {
    const expectedDateDifferenceInDays = 2;

    const actualDateDifferenceInDays = getDateDifferenceInDays({
      start: new Date("1-11-2021"),
      end: new Date("1-12-2021"),
    });

    expect(actualDateDifferenceInDays).toEqual(expectedDateDifferenceInDays);
  });

  test("pass different dates, expect to return 33", () => {
    const expectedDateDifferenceInDays = 33;

    const actualDateDifferenceInDays = getDateDifferenceInDays({
      start: new Date("1-11-2021"),
      end: new Date("2-12-2021"),
    });

    expect(actualDateDifferenceInDays).toEqual(expectedDateDifferenceInDays);
  });
});
