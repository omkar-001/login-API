import db from "../models/index.js";
import { responseError, responseSuccess } from "../utility/response.js";
import { httpStatus, httpMessage } from "../config/http.js";

const { User } = db;

export const updateUser = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, email, age } = req.body;

    // Check if id exists since route shows no id parameter
    if (!id) {
      return responseError(res, "User ID is required", httpStatus.badRequest);
    }

    const user = await User.findByPk(id);
    if (!user) {
      return responseError(res, "User not found", httpStatus.notFound);
    }

    // Validate required name field
    if (!name) {
      return responseError(
        res,
        "Changed Name is required",
        httpStatus.badRequest
      );
    }

    user.name = name;
    user.email = email || user.email;
    user.age = age || user.age;
    await user.save();

    responseSuccess(res, httpMessage.success, {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
    });
  } catch (error) {
    responseError(
      res,
      httpMessage.error,
      httpStatus.internalServerError,
      error
    );
  }
};
