import { Sequelize } from "sequelize";
import nconf from "nconf";
import { Config } from "../../constants";

export const setupDBConnection = async () => {
  const sequelize = new Sequelize(nconf.get(Config.DB_CONNECTION));

  try {
    await sequelize.authenticate();
    console.log("DB connection has been established successfully");
  } catch (e) {
    console.log("Unable to connect to the database");
    throw e;
  }

  return sequelize;
};
