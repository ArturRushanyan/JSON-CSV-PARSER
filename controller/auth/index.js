const constMessages = require("../../utils/constMessages");
const authService = require("../../db_service/auth/service");
const userService = require("../../db_service/user/service");
const subscriptionLimitService = require("../../db_service/subscriptionLimits/service");
const hashHelper = require("../../utils/hash");
const JWTHelpers = require("../../utils/JWT");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const account = await authService.getAccountByEmail(email);

    if (!account) {
      throw { status: 404, message: constMessages.NO_DATA };
    }

    hashHelper.compareAccountPasswords(account.password, password);

    delete account.password;

    const token = await JWTHelpers.generateToken(account);

    return res
      .status(200)
      .send({ success: true, data: { account, jwt: token } });
  } catch (error) {
    next(error);
  }
};

const registerNewUser = async (req, res, next) => {
  try {
    const reqBody = req.body;

    const subscriptionLimit =
      await subscriptionLimitService.getSubscriptionById(
        reqBody.subscriptionId
      );

    if (!subscriptionLimit) {
      throw {
        status: 404,
        message: constMessages.INVALID_PARAMETER("subscriptionId"),
      };
    }

    const user = authService.getAccountByEmail(req.body.email);
    if (user) {
      throw {
        status: 400,
        message: constMessages.USER_ALREADY_EXISTS,
      };
    }

    const newUserData = await userService.registerNewUser(reqBody);

    return res.status(201).send({
      success: true,
      message: constMessages.USER_CREATED,
      data: newUserData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  registerNewUser,
};
