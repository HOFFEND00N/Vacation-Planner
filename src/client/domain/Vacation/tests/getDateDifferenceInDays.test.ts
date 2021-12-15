import { getDateDifferenceInDays } from "../getDateDifferenceInDays";

describe("get date difference in days", () => {
  test("should return 1, when the same dates passed", () => {
    const expectedDateDifferenceInDays = 1;

    const actualDateDifferenceInDays = getDateDifferenceInDays({
      start: new Date("1-11-2021"),
      end: new Date("1-11-2021"),
    });

    expect(actualDateDifferenceInDays).toEqual(expectedDateDifferenceInDays);
  });

  test("should return 2, when 2 dates next to each other are passed", () => {
    const expectedDateDifferenceInDays = 2;

    const actualDateDifferenceInDays = getDateDifferenceInDays({
      start: new Date("1-11-2021"),
      end: new Date("1-12-2021"),
    });

    expect(actualDateDifferenceInDays).toEqual(expectedDateDifferenceInDays);
  });

  test("should return 33, when different dates in different months passed", () => {
    const expectedDateDifferenceInDays = 33;

    const actualDateDifferenceInDays = getDateDifferenceInDays({
      start: new Date("1-11-2021"),
      end: new Date("2-12-2021"),
    });

    expect(actualDateDifferenceInDays).toEqual(expectedDateDifferenceInDays);
  });
});
