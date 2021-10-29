import { Model, DataTypes, Sequelize } from "sequelize";
import { MODELS_NAMES } from "../../constants";

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
    { sequelize, modelName: MODELS_NAMES.USER }
  );

  User.sync();
}
