import { Sequelize } from "sequelize";
import nconf from "nconf";
import { CONFIG } from "../../constants";

export async function setupDBConnection() {
  const sequelize = new Sequelize(nconf.get(CONFIG.DB_CONNECTION));

  try {
    await sequelize.authenticate();
    console.log("DB connection has been established successfully");
  } catch (e) {
    console.log("Unable to connect to the database");
    throw e;
  }

  return sequelize;
}
