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
  const readings = await Reading.find({ "station._id": req.params.id }).select(
    "-__v"
  );

  if (!readings)
    return res
      .status(404)
      .send("The station with the given ID does not have readings.");

  res.send(readings);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const station = await Station.findById(req.body.stationId);
  if (!station)
    return res.status(400).send("The station with the given ID was not found.");

  const date = new Date();

  const reading = new Reading({
    station: station,
    values: {
      temperature: req.body.values.t,
      dust: req.body.values.d,
      windQuality: req.body.values.w,
      humidity: req.body.values.h
    },
    creationDate: `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}`
  });

  await reading.save();

  res.send(reading);
});

module.exports = router;
