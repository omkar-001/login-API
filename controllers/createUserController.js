import db from "../models/index.js";
import bcrypt from "bcrypt";
import { httpMessage, httpStatus } from "../config/http.js";
import { responseSuccess, responseError } from "../utility/response.js";

const { User } = db;

export const createUserController = async (req, res) => {
  try {
    const { name, email, password, age, role_id } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
      role_id, // Associate user with a role
    });

    // Return success response without password
    responseSuccess(res, httpMessage.recordCreated, {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      role_id: user.role_id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    responseError(
      res,
      "Error creating user",
      httpStatus.badRequest,
      error.message
    );
  }
};
