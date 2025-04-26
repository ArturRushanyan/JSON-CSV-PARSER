const express = require("express");
const middleware = require("../../middlewares/auth/auth");
const { registerNewUser } = require("../../controller/auth");

const router = express.Router();

router.post(
  "/register-new-user",
  middleware.validateRegistrationUserData,
  registerNewUser
);

module.exports = router;
