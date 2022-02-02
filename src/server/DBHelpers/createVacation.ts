import { Sequelize } from "sequelize";
import { ModelsNames } from "../constants";
import { VacationType } from "../../sharedKernel";

export async function createVacation({
  vacationStartDate,
  vacationEndDate,
  userId,
  userName,
  dbConnection,
}: {
  vacationStartDate: Date;
  vacationEndDate: Date;
  userId: string;
  userName: string;
  dbConnection: Sequelize;
}) {
  userId = userId.replace(/[{}]/g, "");
  const user = await dbConnection.models[ModelsNames.USER].findOne({
    where: { id: userId },
  });

  if (!user) {
    const [firstName, lastName] = userName.split(" ");
    await dbConnection.models[ModelsNames.USER].create({ id: userId, firstName, lastName });
  }

  return await dbConnection.models[ModelsNames.VACATION].create({
    start: vacationStartDate,
    end: vacationEndDate,
    userId,
    type: VacationType.PENDING_APPROVAL,
  });
}
