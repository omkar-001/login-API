import db from "../models/index.js";
import bcrypt from "bcrypt";
import { httpMessage, httpStatus } from "../config/http.js";
import { responseSuccess, responseError } from "../utility/response.js";

const { User } = db;

export const registerController = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
    });
    responseSuccess(res, httpMessage.success, user);
  } catch (error) {
    responseError(res, httpMessage.notFound, httpStatus.forbidden, error);
  }
};

//  // Hash the password with bcrypt (10 rounds of salt)
//  const hashedPassword = await bcrypt.hash(password, 10);

//  // Create new user record in database
//  const user = await User.create({
//    name,
//    email,
//    password: hashedPassword,
//    age,
//  });

//  // Send success response with safe user data
//  // Note: Password is excluded from response
//  res.status(201).send({
//    message: "User registered successfully",
//    user: {
//      id: user.id,
//      name: user.name,
//      email: user.email,
//      age: user.age,
//      createdAt: user.createdAt,
//      updatedAt: user.updatedAt,
//    },
//  });
// } catch (error) {
//  // Handle registration errors (e.g., duplicate email)
//  res.status(400).send({
//    error: "Registration failed",
//    details: error.message,
//  });
// }
// });
