const { Parser } = require("json2csv");

const jsonToCsv = async (req, res, next) => {
  try {
    const { data } = req.body;

    const parser = new Parser();
    const csv = parser.parse(data);
    res.header("Content-Type", "text/csv");
    res.send(csv);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  jsonToCsv,
};
