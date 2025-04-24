const login = async (req, res) => {
  return res.status(200).send({ success: true });
};

const registerNewUser = async (req, res) => {};

module.exports = {
  login,
  registerNewUser,
};
