import { convertBufferToObjectGUID } from "./convertBufferToObjectGUID";

export const entryParser = (entry, raw, callback) => {
  if (Object.prototype.hasOwnProperty.call(raw, "objectGUID")) {
    entry.objectGUID = convertBufferToObjectGUID(raw.objectGUID);
  }
  callback(entry);
};
