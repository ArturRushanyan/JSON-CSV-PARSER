const express = require("express");
const authMiddleware = require("../../middlewares/auth/auth");
const authController = require("../../controller/auth/index");

const router = express.Router();

router.post("/login", authMiddleware.validateLoginData, authController.login);
router.post(
  "/register-user",
  authMiddleware.validateRegistrationUserData,
  authController.registerNewUser
);

module.exports = router;
