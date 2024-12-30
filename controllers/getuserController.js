import db from "../models/index.js";
import { Op } from "sequelize";
import {
  responseSuccess,
  responseFail,
  responseError,
} from "../utility/response.js";
import { httpMessage, httpStatus } from "../config/http.js";
import { pagination } from "../config/helper.js";
const { User } = db;

export const index = async (req, res) => {
  try {
    const { limit, offset } = await pagination(req);

    const users = await User.findAll({
      attributes: ["id", "name", "email", "age"],
      limit: limit,
      offset: offset,
    });

    responseSuccess(res, httpMessage.success, users);
  } catch (error) {
    responseError(res, httpMessage.notFound, httpStatus.forbidden, error);
  }
};

export const getUserController = async (req, res) => {
  try {
    const { limit, offset } = await pagination(req);

    const users = await User.findAll({
      attributes: ["id", "name", "email", "age"],
      limit: limit,
      offset: offset,
    });

    responseSuccess(res, httpMessage.success, users);
  } catch (error) {
    responseError(res, httpMessage.notFound, httpStatus.forbidden, error);
  }
};

export const getUserSortedController = async (req, res) => {
  try {
    const { page, limit, total, pageCount, offset, orderBy, orderValue } =
      await pagination(req);

    const sortOrder = orderValue?.toLowerCase() === "desc" ? "DESC" : "ASC";

    const search = req.query.search;
    let whereClause = {};

    if (search) {
      whereClause = {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
        ],
      };
    }

    const users = await User.findAll({
      attributes: ["id", "name", "email", "age"],
      limit: limit,
      offset: offset,
      order: [[orderBy || "id", sortOrder]],
      where: whereClause,
    });

    responseSuccess(res, httpMessage.success, {
      users,
      details: { page, limit, total, pageCount },
    });
  } catch (error) {
    responseError(res, httpMessage.notFound, httpStatus.forbidden, error);
  }
};

export const getHomeController = async (req, res) => {
  responseSuccess(res, httpMessage.success, "Hello World");
};

export const testusers = async (req, res) => {
  // const users = await User.findAll({
  //   attributes: [
  //     "id",
  //     "name",
  //     "email",
  //     "age",
  //     "password",
  //     "createdAt",
  //     "updatedAt",
  //   ],
  //   limit: 10,
  //   offset: 10,
  //   // Example of filtered query using Sequelize operators
  //   // where: { age: { [Op.lte]: 23 } }, // Get users age <= 23
  //   order: [["name", "DESC"]],
  // });
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "age"],
      order: [["age"]],
    });

    responseSuccess(res, httpMessage.success, users);
  } catch (error) {
    responseError(res, httpMessage.notFound, httpStatus.forbidden, error);
  }
};
