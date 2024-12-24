import { Sequelize, DataTypes } from 'sequelize';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from 'dotenv';
import UserModel from './user.js';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Initialize models
db.User = UserModel(sequelize, DataTypes);

export default db;
