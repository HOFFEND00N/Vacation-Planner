import nconf from "nconf";

export function setupConfig() {
  nconf.argv().env().file({ file: "developmentConfig.json" });
}
