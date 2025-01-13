import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class RoleActionPermission extends Model {
    static associate(models) {
      // Associations are defined in Role and ModuleAction models
    }
  }

  RoleActionPermission.init(
    {
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "roles",
          key: "id",
        },
      },
      action_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "module_actions",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "RoleActionPermission",
      tableName: "role_action_permissions",
      timestamps: false,
    }
  );

  return RoleActionPermission;
};
