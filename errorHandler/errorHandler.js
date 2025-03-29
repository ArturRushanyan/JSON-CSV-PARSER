const errorHandler = (error, req, res, next) => {
  console.log("error ========", error);
  return res
    .status(error.status)
    .send({ success: false, error: { message: error.message } });
};

module.exports = errorHandler;
