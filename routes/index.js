const JsonToCsvV1 = require("./V1/index");
const Auth = require("./auth/index");
const AdminPanel = require("./admin/index");
const {
  limitChecker,
  identifyRequest,
} = require("../middlewares/limits/limits");
const { validateJWT } = require("../middlewares/auth/auth");

const indexRoutes = (app) => {
  app.use("/api/auth", Auth);
  app.use("/api/admin", validateJWT, AdminPanel);
  app.use(identifyRequest);
  app.use("/api/v1", limitChecker, JsonToCsvV1);
};

module.exports = indexRoutes;
