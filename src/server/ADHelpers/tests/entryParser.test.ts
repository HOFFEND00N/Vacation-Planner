import { entryParser } from "../entryParser";
import { convertBufferToObjectGUID } from "../convertBufferToObjectGUID";
jest.mock("../convertBufferToObjectGUID");

describe("entry parser", () => {
  let callback, mockConvertFunction;
  beforeEach(() => {
    callback = jest.fn();
    mockConvertFunction = jest.fn();
    (convertBufferToObjectGUID as jest.Mock).mockImplementation(mockConvertFunction);
  });

  test("should not call convert method for objectGUID, then call callback, when raw does not contain objectGUID property", () => {
    entryParser({}, {}, callback);

    expect(callback).toBeCalledTimes(1);
    expect(mockConvertFunction).toBeCalledTimes(0);
  });

  test("should call convert method for objectGUID, then call callback, when raw contain objectGUID property", () => {
    entryParser({}, { objectGUID: "" }, callback);

    expect(callback).toBeCalledTimes(1);
    expect(mockConvertFunction).toBeCalledTimes(1);
  });
});
