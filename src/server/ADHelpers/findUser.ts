import { IActiveDirectory, ITeamMember } from "../../types";

export function findUser(activeDirectory: IActiveDirectory, username: string): Promise<ITeamMember> {
  return new Promise((resolve, reject) => {
    activeDirectory.findUser(
      {
        attributes: [],
        entryParser: customEntryParser,
      },
      username,
      function (err, user) {
        if (err) {
          reject(err);
        }

        if (!user) reject("User: " + username + " not found.");
        else {
          resolve(user);
        }
      }
    );
  });
}

function customEntryParser(entry, raw, callback) {
  entry.objectGUID = convertObjectGUIDToUUID(raw.objectGUID);
  callback(entry);
}

const convertObjectGUIDToUUID = (objectGUID: Buffer) => {
  const hexValue = objectGUID.toString("hex");

  return hexValue
    .replace(
      //   (   $1:A4   )(   $2:A3   )(   $3:A2   )(   $4:A1   )(   $5:B2   )(   $6:B1   )(   $7:C2   )(   $8:C1   )(   $9:D    )(   $10:F    )
      /([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{4})([0-9a-f]{10})/,
      "$4$3$2$1-$6$5-$8$7-$9-$10"
    )
    .toLocaleUpperCase();
};
