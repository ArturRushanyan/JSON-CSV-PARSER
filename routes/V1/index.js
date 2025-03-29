const express = require("express");
const middlewaresV1 = require("../../middlewares/V1/jsonToCsv");
const controllerV1 = require("../../controller/V1/index");

const router = express.Router();

router.post("/json-to-csv", middlewaresV1.isValidJSON, controllerV1.jsonToCsv);
router.post("/csv-to-json", controllerV1.csvToJson);

module.exports = router;
