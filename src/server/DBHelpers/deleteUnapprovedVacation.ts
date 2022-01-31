import { Sequelize } from "sequelize";
import { ModelsNames } from "../constants";

export async function deleteUnapprovedVacation({
  vacationId,
  dbConnection,
}: {
  vacationId: string;
  dbConnection: Sequelize;
}) {
  return await dbConnection.models[ModelsNames.VACATION].destroy({ where: { id: vacationId } });
}
