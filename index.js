// ===== IMPORTS =====
// Core framework and middleware imports
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

// Custom middleware imports
import logger from "./middleware/logger.js";

// Database and authentication imports
import routes from "./routes/routes.js";
// ===== CONFIGURATION =====
dotenv.config(); // Load environment variables
const app = express(); // Initialize Express app

// ===== MIDDLEWARE =====
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Add security headers
app.use(logger); // Custom request logging

/* Database sync code (commented out for production)

db.sequelize.sync()
  .then(async () => {
    console.log('Database connected successfully');
    // Test user creation logic...
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });
*/

app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
