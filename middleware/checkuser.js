import jwt from "jsonwebtoken";
import { responseError } from "../utility/response.js";
import { httpMessage, httpStatus } from "../config/http.js";
import db from "../models/index.js";

const { User } = db;

export const checkUserRole = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return responseError(res, "No token provided", httpStatus.unauthorized);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return responseError(res, "User not found", httpStatus.notFound);
    }

    if (!decoded.isAdmin) {
      return responseError(
        res,
        "Access denied. Admin only.",
        httpStatus.forbidden
      );
    }

    req.user = {
      ...user.toJSON(),
      isAdmin: decoded.isAdmin,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return responseError(
      res,
      "Authentication failed",
      httpStatus.unauthorized,
      error.message
    );
  }
};
