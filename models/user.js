import { Model } from "sequelize";

/**
 * User Model Definition
 * Defines the structure and validation for the Users table
 *
 * @param {Object} sequelize - Sequelize instance
 * @param {Object} DataTypes - Sequelize data types
 * @returns {Model} User model
 */
export default (sequelize, DataTypes) => {
  // Define User class extending Sequelize Model
  class User extends Model {
    static associate(models) {
      // Define association with Role model
      User.belongsTo(models.Role, {
        foreignKey: "role_id",
        as: "role",
      });
    }
  }

  User.init(
    {
      // Primary Key - Auto-incrementing ID
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // User's full name
      name: {
        type: DataTypes.STRING,
        allowNull: false, // Name is required
      },
      // User's email address (unique identifier)
      email: {
        type: DataTypes.STRING,
        allowNull: false, // Email is required
        unique: true, // No duplicate emails allowed
        validate: {
          isEmail: true, // Must be valid email format
        },
      },
      // User's password (stored as hash)
      password: {
        type: DataTypes.STRING,
        allowNull: false, // Password is required
      },
      // User's age
      age: {
        type: DataTypes.INTEGER,
        allowNull: true, // Age is optional
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3,
        references: {
          model: "roles",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users", // Explicit table name in database
      // Additional model options:
      // timestamps: true,  // Adds createdAt and updatedAt (default: true)
      // paranoid: false,   // Soft deletes (adds deletedAt) (default: false)
      // underscored: false // Use snake_case for fields (default: false)
    }
  );

  return User;
};
