import db from "../models/index.js";
import crypto from "crypto";
import { httpMessage, httpStatus } from "../config/http.js";
import { responseSuccess, responseError } from "../utility/response.js";
import { Op } from "sequelize";
import { sendEmail } from "../config/helper.js";
import bcrypt from "bcrypt";
const { User, ResetUser } = db;
import emailQueue from "../job/emailjob.js";

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return responseError(res, "Email not found", httpStatus.notFound);
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expireAt = new Date(Date.now() + 3600000); // expires in 1 hour

    await ResetUser.create({
      email: user.email,
      token: resetToken,
      expireAt,
    });

    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

    await emailQueue.add({ user, resetUrl });

    responseSuccess(res, "Password reset link sent", {
      message: "Sent you a mail to reset password",
    });
  } catch (error) {
    responseError(
      res,
      "Error processing request",
      httpStatus.internalServerError,
      error.message
    );
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const token = req.query.token;

    const resetUser = await ResetUser.findOne({
      where: {
        token,
        expireAt: { [Op.gt]: new Date() },
      },
    });

    if (!resetUser) {
      return responseError(
        res,
        "Invalid or expired reset token",
        httpStatus.badRequest
      );
    }

    const user = await User.findOne({
      where: { email: resetUser.email },
    });

    if (!user) {
      return responseError(res, "User not found", httpStatus.notFound);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    await ResetUser.destroy({ where: { email: resetUser.email } });

    responseSuccess(res, "Password reset successful", {
      message: "You can now login with your new password",
    });
  } catch (error) {
    responseError(
      res,
      "Error resetting password",
      httpStatus.internalServerError,
      error.message
    );
  }
};
