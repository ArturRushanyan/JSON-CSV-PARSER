const constantMessages = require("../utils/constMessages");

const errorHandler = (error, req, res, next) => {
  console.log("error in global error Handler ========", error);
  return res
    .status(error.status || 500)
    .send({
      success: false,
      error: {
        message: error?.message || constantMessages.INTERNAL_SERVER_ERROR,
      },
    });
};

module.exports = errorHandler;
