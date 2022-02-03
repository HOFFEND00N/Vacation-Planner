import { Op, Sequelize } from "sequelize";
import { ModelsNames } from "../constants";
import { Vacation } from "../../sharedKernel";

export async function getTeamVacations({
  dbConnection,
  usersIds,
}: {
  dbConnection: Sequelize;
  usersIds: string[];
}): Promise<Vacation[]> {
  return (await dbConnection.models[ModelsNames.VACATION].findAll({
    where: { userId: { [Op.or]: usersIds } },
    raw: true,
  })) as unknown as Vacation[];
}
