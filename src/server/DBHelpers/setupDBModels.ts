import { Model, DataTypes, Sequelize } from "sequelize";

class User extends Model {}
class Vacation extends Model {}

export async function setupDBModels(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
      },
    },
    { sequelize }
  );

  Vacation.init(
    {
      start: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      end: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
      },
    },
    { sequelize }
  );

  await Vacation.sync();
  await User.sync();
}
