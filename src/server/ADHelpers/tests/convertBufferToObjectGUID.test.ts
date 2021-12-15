import { convertBufferToObjectGUID } from "../convertBufferToObjectGUID";

describe("convert buffer to ObjectGUID", () => {
  test("should return objectGUID, when buffer passed", () => {
    const expectedObjectGUID = "B19BDE9E-E357-4B89-8A26-A6C8CE3AD86A";

    const actualObjectGuid = convertBufferToObjectGUID(Buffer.from("9ede9bb157e3894b8a26a6c8ce3ad86a", "hex"));

    expect(actualObjectGuid).toEqual(expectedObjectGUID);
  });
});
