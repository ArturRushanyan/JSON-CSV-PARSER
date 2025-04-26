const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../configs/config");
const constMessages = require("./constMessages");

const generateToken = async (payload) => {
  const token = jwt.sign({ ...payload }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return token;
};

const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    return decoded;
  } catch (error) {
    if (error.message === "jwt expired") {
      throw { status: 401, message: constMessages.TOKEN_IS_EXPIRED };
    }
    throw error;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
