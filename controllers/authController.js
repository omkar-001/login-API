import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { httpMessage, httpStatus } from "../config/http.js";
import { responseSuccess, responseError } from "../utility/response.js";

const { User } = db;

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      attributes: ["id", "name", "email", "password"],
      where: { email },
    });
    if (!user) {
      throw new Error("Invalid login credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid login credentials");
    }
    const token = jwt.sign(
      {
        // exp: Math.floor(Date.now() / 1000) + 10 * 60,
        id: user.id,
      },
      process.env.JWT_SECRET
    );

    responseSuccess(res, httpMessage.success, { token });
  } catch (error) {
    responseError(
      res,
      httpMessage.invalidLoginCredentials,
      httpStatus.unauthorized,
      error.message
    );
  }
};

// async (req, res) => {
//     try {
//       // Extract login credentials from request
//       const { email, password } = req.body;

//       // Find user by email
//       const user = await User.findOne({ where: { email } });

//       // If user not found, throw error
//       if (!user) {
//         throw new Error("Invalid login credentials");
//       }

//       // Compare provided password with stored hash
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         throw new Error("Invalid login credentials");
//       }

//       // Generate JWT token with user ID
//   const token = jwt.sign(
//     { exp: Math.floor(Date.now() / 1000) + 10 * 60, id: user.id },
//     process.env.JWT_SECRET
//   );
//       // Send user data and token
//       res.send({ user, token });
//     } catch (error) {
//       res.status(400).send({ error: error.message });
//     }
//   }