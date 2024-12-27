import db from "../models/index.js";
const { User } = db;
import nodemailer from "nodemailer";
import fs from "fs";

export const pagination = async (req) => {
  const {
    orderBy = "id",
    page = 1,
    orderValue = "ASC",
    limit = 10,
  } = req.query;

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  const total = await User.count();
  const pageCount = Math.ceil(total / limitNum);

  if (pageNum > pageCount) pageNum = pageCount;

  const offset = (pageNum - 1) * limitNum;

  return {
    page: pageNum,
    limit: limitNum,
    total,
    pageCount,
    offset,
    orderBy,
    orderValue,
  };
};

export const sendEmail = async (user, resetUrl) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "maurine59@ethereal.email",
      pass: "4Px4HX5mGqnyzkgNhg",
    },
  });

  const html = fs.readFileSync("./config/forgotpass.html", "utf8");
  const mailOptions = {
    from: "Kar Change Password <maurine59@ethereal.email>",
    to: user.email,
    subject: "Password Reset Request",
    html: html.replaceAll("${resetUrl}", resetUrl),
  };
  await transporter.sendMail(mailOptions);
};
