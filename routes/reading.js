const { Reading, validate } = require("../models/sensor");
const { Station } = require("../models/station");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const readings = await Reading.find().select("-__v");
  res.send(readings);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const reading = new Reading({
    station: {
      _id: req.body.station._id
    },
    temperature: req.body.temperature,
    dust: req.body.dust,
    windQuality: req.body.windQuality,
    humidity: req.body.humidity,
    creationDate: moment().toJSON()
  });
  await reading.save();

  res.send(reading);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const sensor = await Sensor.findByIdAndUpdate(
    req.params.id,
    {
      description: req.body.description,
      model: req.body.model
    },
    { new: true }
  );

  if (!sensor)
    return res.status(404).send("The sensor with the given ID was not found.");

  res.send(sensor);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const sensor = await Sensor.findByIdAndRemove(req.params.id);

  if (!sensor)
    return res.status(404).send("The sensor with the given ID was not found.");

  res.send(sensor);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const sensor = await Sensor.findById(req.params.id).select("-__v");

  if (!sensor)
    return res.status(404).send("The sensor with the given ID was not found.");

  res.send(sensor);
});

module.exports = router;
