const constMessages = require("../../utils/constMessages");
const authService = require("../../db_service/auth/service");
const userService = require("../../db_service/user/service");
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
