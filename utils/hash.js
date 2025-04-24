const crypto = require("crypto");

const generateHash = (apiKey, secretKey) => {
  const data = `${apiKey}-${secretKey}`;

  const hash = crypto
    .createHmac("sha256", secretKey)
    .update(data)
    .digest("hex");

  return hash;
};

module.exports = {
  generateHash,
};
