import { Model, DataTypes, Sequelize } from "sequelize";

class User extends Model {}

export function setupDBModels(sequelize: Sequelize) {
  User.init(
    {
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

  User.sync();
}
