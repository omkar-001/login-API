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
    /**
     * Define model associations here if needed
     * Example: User.hasMany(models.Post)
     */
    // static associate(models) {}
  }

  // Initialize User model with its schema
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
      // createdAt and updatedAt are automatically added by Sequelize
      // unless timestamps: false is set in the options
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
