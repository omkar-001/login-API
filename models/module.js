import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Module extends Model {
    static associate(models) {
      // Define associations
      Module.hasMany(models.ModuleAction, {
        foreignKey: "module_id",
        as: "actions",
      });
    }
  }

  Module.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      module_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Module",
      tableName: "modules",
      timestamps: false,
    }
  );

  return Module;
};
