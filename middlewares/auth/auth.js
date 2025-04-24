const validator = require("validator");

const validateLoginData = async (req, res, next) => {
  try {
    if (!req.body?.email && !validator.isEmail(req.body.email)) {
      throw {
        status: 400,
        message: "Email is required",
      };
    }

    if (!req.body?.password) {
      throw {
        status: 400,
        message: "password is required",
      };
    }

    next();
  } catch (error) {
    next(error);
  }
};

const validateRegistrationUserData = async (req, res, next) => {}

module.exports = {
  validateLoginData,
  validateRegistrationUserData
};
