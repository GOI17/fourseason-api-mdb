const { Reading, validate } = require("../models/reading");
const { Station } = require("../models/station");
const moment = require("moment");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const readings = await Reading.find()
    .select("-__v")
    .sort("date");
  res.send(readings);
});

router.get("/:id", async (req, res) => {
  const readings = await Reading.findById(req.params.id)
    .select("-__v")
    .sort("date");
  res.send(readings);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const station = await Station.findById(req.body.stationId);
  if (!station)
    return res.status(400).send("The station with the given ID was not found.");

  const reading = new Reading({
    station: station,
    values: {
      temperature: req.body.values.temperature,
      dust: req.body.values.dust,
      windQuality: req.body.values.windQuality,
      humidity: req.body.values.humidity
    },
    creationDate: moment().toJSON()
  });

  await reading.save();

  res.send(reading);
});

module.exports = router;
