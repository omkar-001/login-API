import { Sequelize, DataTypes } from "sequelize";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { config } from "dotenv";
import UserModel from "./user.js";
import ResetUserModel from "./resetuser.js";
import logger from "../config/logger.js";

/**
 * Database Configuration and Model Initialization
 * Sets up Sequelize connection and initializes models
 */

// Load environment variables
config();

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Sequelize instance with database configuration
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database username
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // Database host
    dialect: "mysql", // Database type
    // Additional options:
    // logging: false,         // Disable SQL query logging
    // pool: {                // Connection pool settings
    //   max: 5,
    //   min: 0,
    //   acquire: 30000,
    //   idle: 10000
    // }
    logging: (msg) => logger.info(msg), // Changed to info level since debug level messages won't show by default
  }
);

// Initialize database object
const db = {};

// Add Sequelize instances to db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Initialize models
db.User = UserModel(sequelize, DataTypes);
db.ResetUser = ResetUserModel(sequelize, DataTypes);
// Export database object with models
export default db;
