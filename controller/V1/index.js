const jsonToCsv = require("./jsonToCsv");
const csvToJson = require("./csvToJson");

module.exports = {
  ...jsonToCsv,
  ...csvToJson,
};
