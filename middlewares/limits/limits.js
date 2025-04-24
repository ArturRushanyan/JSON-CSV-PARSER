const userService = require("../../service/user/service");
const constMessages = require("../../utils/constMessages");
const hashHelper = require("../../utils/hash");

const limitChecker = async (req, res, next) => {
  try {
    const apiKey = req.headers.apikey;
    const hash = req.headers.hash;

    if (!apiKey || !hash) {
      throw { status: 400, message: constMessages.MISSING_PARAMETERS };
    }

    const userInfo = await userService.getUserByApiKey(apiKey);

    if (!userInfo) {
      throw { status: 404, message: constMessages.NO_DATA };
    }

    const { subscriptionLimits } = userInfo;
    if (userInfo.requestCount > subscriptionLimits.requestLimit) {
      throw { status: 400, message: constMessages.SUBSCRIPTION_LIMIT_REACHED };
    }

    const generatedHash = hashHelper.generateHash(
      userInfo.apiKey,
      userInfo.userSecrets.secretKey
    );

    if (generatedHash !== hash) {
      throw { status: 400, message: constMessages.INVALID_HASH };
    }

    await userService.incrementUserRequestsCount(userInfo.id);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  limitChecker,
};
