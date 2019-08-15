const express = require("express");
const station = require("../routes/station");
const sensor = require("../routes/sensor");
const reading = require("../routes/reading");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/stations", station);
  app.use("/api/readings", reading);
  app.use("/api/sensors", sensor);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
