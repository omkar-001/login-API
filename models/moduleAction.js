import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class ModuleAction extends Model {
    static associate(models) {
      ModuleAction.belongsTo(models.Module, {
        foreignKey: "module_id",
        as: "module",
      });
      ModuleAction.belongsToMany(models.Role, {
        through: {
          model: models.RoleActionPermission,
          timestamps: false,
        },
        foreignKey: "action_id",
        as: "roles",
      });
    }
  }

  ModuleAction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      module_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "modules",
          key: "id",
        },
      },
      action_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ModuleAction",
      tableName: "module_actions",
      timestamps: false,
    }
  );

  return ModuleAction;
};
