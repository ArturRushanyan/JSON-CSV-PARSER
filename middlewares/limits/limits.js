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

    // TODO: Need to check headers
    // 1. X-RapidAPI-Plan this is may be the id of plan which is need to be check
    // 2. X-RapidAPI-User don't know what is this need to do research.
    // 3. X-RapidAPI-Subscription don't know what is this need to do research.
    // await userService.incrementUserRequestsCount(userInfo.id);

    // NOTE: If everything is good need to process request.
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  limitChecker,
};
