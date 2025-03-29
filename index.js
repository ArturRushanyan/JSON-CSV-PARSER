const express = require("express");

const startServer = require("./server");

const app = express();

module.exports = app;

startServer(app);
