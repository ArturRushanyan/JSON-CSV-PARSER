const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const routes = require("./routes/index");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./errorHandler/errorHandler");

const startServer = async (app) => {
  try {
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10, // Limit each IP to 100 requests per windowMs
      message: { error: "Too many requests, please try again later." },
    });

    app.use(limiter);
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
