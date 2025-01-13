import { responseError } from "../utility/response.js";
import { httpMessage, httpStatus } from "../config/http.js";
import db from "../models/index.js";
import jwt from "jsonwebtoken";

const { User, Role, ModuleAction, Module } = db;

export const checkPermission = (moduleName, actionName) => {
  return async (req, res, next) => {
    try {

      if (actionName === "view") {
        return next();
      }

      const permissions = req.user.permissions;

      const module = await Module.findOne({
        where: { module_name: moduleName },
      });

      if (!module) {
        return responseError(
          res,
          "Permission denied",
          httpStatus.forbidden,
          `Module ${moduleName} not found`
        );
      }

      const moduleAction = await ModuleAction.findOne({
        where: {
          module_id: module.id,
          action_name: actionName,
        },
      });

      if (!moduleAction) {
        return responseError(
          res,
          "Permission denied",
          httpStatus.forbidden,
          "Action not found"
        );
      }

      if (permissions.includes(moduleAction.id)) {
        return next();
      }

      const errorMessage =
        actionName === "delete"
          ? "Only administrators can delete users"
          : "You don't have permission to perform this action";

      return responseError(
        res,
        "Permission denied",
        httpStatus.forbidden,
        errorMessage
      );
    } catch (error) {
      console.error("Permission check error:", error);
      return responseError(
        res,
        "Permission check failed",
        httpStatus.internalServerError,
        error.message
      );
    }
  };
};
