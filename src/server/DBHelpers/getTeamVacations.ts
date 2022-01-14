import { Op, Sequelize } from "sequelize";
import { ModelsNames } from "../../constants";

export async function getTeamVacations({ dbConnection, usersIds }: { dbConnection: Sequelize; usersIds: string[] }) {
  return await dbConnection.models[ModelsNames.VACATION].findAll({
    where: { userId: { [Op.or]: usersIds } },
  });
}
