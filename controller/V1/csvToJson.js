const csvParser = require("csv-parser");
const { Readable } = require("stream");

const csvToJson = async (req, res) => {
  try {
    const csvData = req.body;
    const stream = Readable.from(csvData);
    const results = [];

    stream
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        res.json({ data: results });
      })
      .on("error", (error) => {
        res
          .status(500)
          .json({ error: "Conversion error", details: error.message });
      });
  } catch (error) {
    res.status(500).json({ error: "Conversion error", details: error.message });
  }
};

module.exports = {
  csvToJson,
};
