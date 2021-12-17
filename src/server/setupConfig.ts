import nconf from "nconf";

export const setupConfig = () => {
  nconf.argv().env().file({ file: "developmentConfig.json" });
};
