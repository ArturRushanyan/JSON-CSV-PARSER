const isValidJSON = async (req, res, next) => {
  try {
    if (!req.body.data) {
      throw {
        status: 400,
        message: "Data is required",
      };
    }

    const { data } = req.body;
    if (!Array.isArray(data)) {
      throw {
        status: 400,
        message: "Invalid JSON format. Expected an array.",
      };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isValidJSON,
};
