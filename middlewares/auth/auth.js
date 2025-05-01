const validator = require("validator");
const { verifyToken } = require("../../utils/JWT");
const constMessages = require("../../utils/constMessages");

const validateLoginData = async (req, res, next) => {
  try {
    if (!req.body?.email || !validator.isEmail(req.body.email)) {
      throw {
        status: 400,
        message: constMessages.PARAMETER_IS_REQUIRED("Email"),
      };
    }

    if (!req.body?.password) {
      throw {
        status: 400,
        message: constMessages.PARAMETER_IS_REQUIRED("Password"),
      };
    }

    next();
  } catch (error) {
    next(error);
  }
};

const validateJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw { status: 401, message: constMessages.MISSING_AUTH_HEADERS };
    }

    const token = authHeader.split(" ")[1];

    const decodedData = await verifyToken(token);

    req.decodedData = decodedData;

    next();
  } catch (error) {
    next(error);
  }
};

const validateRegistrationUserData = async (req, res, next) => {
  const reqBody = req.body;

  try {
    if (!reqBody.email || !validator.isEmail(reqBody.email)) {
      throw {
        status: 400,
        message: constMessages.PARAMETER_IS_REQUIRED("Email"),
      };
    }

    if (
      !reqBody.subscriptionId ||
      !validator.isNumeric(`${reqBody.subscriptionId}`)
    ) {
      throw {
        status: 400,
        message: constMessages.PARAMETER_IS_REQUIRED("SubscriptionId"),
      };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateLoginData,
  validateRegistrationUserData,
  validateJWT,
};
