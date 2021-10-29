import { DataTypes, Sequelize } from "sequelize";

export function setupDBModels(sequelize: Sequelize) {
  const User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  });
  User.sync();

  return User;
}
