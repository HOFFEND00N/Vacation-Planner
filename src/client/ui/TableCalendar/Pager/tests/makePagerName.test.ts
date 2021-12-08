import moment from "moment";
import { makePagerName } from "../makePagerName";

test("should return January 2021, when 1 January 2021 passed", () => {
  const expectedPagerName = "January 2021";

  const actualPagerName = makePagerName(moment(new Date("1-11-2021")));

  expect(actualPagerName).toEqual(expectedPagerName);
});
