import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class ResetUser extends Model {}
  ResetUser.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expireAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ResetUser",
      tableName: "ResetUsers",
    }
  );
  return ResetUser;
};
