import db from "../models/index.js";
import bcrypt from "bcrypt";

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
    res.send(user);
  } catch (error) {
    res.status(400).send({
      error: "Registration failed",
      details: error.message,
    });
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
