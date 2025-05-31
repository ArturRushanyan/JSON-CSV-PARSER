const constMessages = require("../../utils/constMessages");
const firebaseService = require("../../db_service/firebaseService/service");
// const userService = require("../../db_service/user/service");
const hashHelper = require("../../utils/hash");

const limitChecker = async (req, res, next) => {
  try {
    const apiKey = req.headers.apikey;
    const hash = req.headers.hash;

    if (!apiKey || !hash) {
      throw { status: 400, message: constMessages.MISSING_PARAMETERS };
    }

    // const userInfo = await userService.getUserByApiKey(apiKey);
    const userInfo = await firebaseService.getUserByApiKey(apiKey);

    if (!userInfo) {
      throw { status: 404, message: constMessages.NO_DATA };
    }

    // const { subscriptionLimits } = userInfo;
    // if (userInfo.requestCount > subscriptionLimits.requestLimit) {
    //   throw { status: 400, message: constMessages.SUBSCRIPTION_LIMIT_REACHED };
    // }

    const generatedHash = hashHelper.generateHash(
      userInfo.apiKey,
      userInfo.userSecrets
    );

    if (generatedHash !== hash) {
      throw { status: 400, message: constMessages.INVALID_HASH };
    }

    next();
  } catch (error) {
    next(error);
  }
};

const identifyRequest = (req, res, next) => {
  try {
    const isRapidAPIRequest =
      req.headers["x-rapidapi-user"] &&
      req.headers["x-rapidapi-proxy-secret"] &&
      req.headers["x-rapidapi-request-id"];

    if (isRapidAPIRequest) {
      next();
    } else {
      throw { status: 403, message: constMessages.FORBIDDEN };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  limitChecker,
  identifyRequest,
};
