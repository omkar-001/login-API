import db from "../models/index.js";
import { responseSuccess, responseFail } from "../utility/response.js";

const { User: users } = db;
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return responseFail(res, "User ID is required", 400);
    }

    const user = await users.findByPk(id);
    if (!user) {
      return responseFail(res, "User not found", 404);
    }

    await user.destroy();
    return responseSuccess(res, "User deleted successfully", null, 200);
  } catch (error) {
    console.error("Error deleting user:", error);
    return responseFail(
      res,
      "An error occurred while deleting user",

      500
    );
  }
};
