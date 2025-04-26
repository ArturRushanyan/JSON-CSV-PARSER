const crypto = require("crypto");
const bcrypt = require("bcrypt");
const constMessages = require("../utils/constMessages");

const generateHash = (apiKey, secretKey) => {
  const data = `${apiKey}-${secretKey}`;

  const hash = crypto
    .createHmac("sha256", secretKey)
    .update(data)
    .digest("hex");

  return hash;
};

const hashAccountPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

const compareAccountPasswords = (hash, password) => {
  const passwordsMatch = bcrypt.compareSync(password, hash);
  if (!passwordsMatch) {
    throw { status: 400, message: constMessages.INVALID_LOGIN_CREDENTIALS };
  }
};

module.exports = {
  generateHash,
  hashAccountPassword,
  compareAccountPasswords,
};
