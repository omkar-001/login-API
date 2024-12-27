import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import logger from "./middleware/logger.js";

import routes from "./routes/routes.js";

dotenv.config(); // Load environment variables
const app = express(); // Initialize Express app
// (async () => {
//   try {
//     await db.sequelize.sync({ alter: true }); // Alter will ensure the table matches the model
//     console.log("Database synchronized successfully");
//   } catch (error) {
//     console.error("Error syncing database:", error);
//   }
// })();

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
