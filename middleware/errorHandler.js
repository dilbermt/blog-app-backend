const { statusCodes } = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case statusCodes.VALIDATION_ERROR:
      res.json({
        title: "Validation error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case statusCodes.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case statusCodes.UNAUTHORIZED:
      res.json({
        title: "unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case statusCodes.INTERNAL_SERVER_ERROR:
      res.json({
        title: "Internal server error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      res.status(400).json({
        error: true,
        title: "something went wrong",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
  }
};

module.exports = errorHandler;
