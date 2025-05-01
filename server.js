const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./configs/config");
const routes = require("./routes/index");
const errorHandler = require("./errorHandler/errorHandler");

const startServer = async (app) => {
  try {
    app.use(cors());

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(bodyParser.text());

    routes(app);

    app.use(errorHandler);

    app.listen(config.PORT, () => {
      console.log(`Server is up on port: ${config.PORT}`);
    });
  } catch (error) {
    console.log("Server is not running:", error);
  }
};

module.exports = startServer;
