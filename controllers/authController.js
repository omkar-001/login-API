import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { httpMessage, httpStatus } from "../config/http.js";
import { responseSuccess, responseError } from "../utility/response.js";

const { User, Role } = db;

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      attributes: ["id", "name", "email", "password", "role_id"],
      where: { email },
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "role_name"],
        },
      ],
    });

    if (!user) {
      throw new Error("Invalid login credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid login credentials");
    }
    const permissions = await db.RoleActionPermission.findAll({
      where: { role_id: user.role_id },
      attributes: ["role_id", "action_id"],
      raw: true,
    });

    const actionIds = permissions.map((p) => p.action_id);

    const token = jwt.sign(
      {
        id: user.id,
        role_id: user.role_id,
        role_name: user.role.role_name,
        permissions: actionIds,
      },
      process.env.JWT_SECRET
    );

    responseSuccess(res, httpMessage.success, {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.role_name,
      },
    });
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
