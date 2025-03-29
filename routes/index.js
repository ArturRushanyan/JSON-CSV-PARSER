const JsonToCsvV1 = require("./V1/index");
const auth = require("../routes/auth/index");

const indexRoutes = (app) => {
  app.use("/api/auth", auth);
  app.use("/api/v1", JsonToCsvV1);
};

module.exports = indexRoutes;
