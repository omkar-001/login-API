import { httpMessage, httpStatus } from "../config/http.js";

const responseSuccess = (res, message, data, code = httpStatus.ok) => {
  const response = {
    status: true,
    message,
    data,
  };
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
  return res.status(code).json(response);
};

export { responseSuccess, responseFail, responseError };
