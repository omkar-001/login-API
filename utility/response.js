import { httpMessage, httpStatus } from "../config/http.js";
import logger from "../config/logger.js";

const responseSuccess = (res, message, data, code = httpStatus.ok) => {
  const response = {
    status: true,
    message,
    data,
  };
  logger.info(JSON.stringify(response));
  return res.status(code).json(response);
};

const responseFail = (
  res,
  message,
  code = httpStatus.badRequest,
  errors = []
) => {
  const response = {
    status: false,
    message,
    errors,
  };
  logger.error(JSON.stringify(response));
  // res.send(response);
  return res.status(code).json(response);
};

const responseError = (
  res,
  message,
  code = httpStatus.internalServerError,
  errors = []
) => {
  const response = {
    status: false,
    message,
    errors,
  };
  logger.error(JSON.stringify(response));

  return res.status(code).json(response);
};

export { responseSuccess, responseFail, responseError };
