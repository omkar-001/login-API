import jwt from "jsonwebtoken";
import { responseError } from "../utility/response.js";
import { httpMessage, httpStatus } from "../config/http.js";

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return responseError(res, "No token provided", httpStatus.unauthorized);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return responseError(
      res,
      "Please authenticate",
      httpStatus.unauthorized,
      error.message
    );
  }
};

export default auth;
