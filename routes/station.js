const { Station, validate } = require("../models/station");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const stations = await Station.find()
    .select("-__v")
    .sort("name");
  res.send(stations);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  var station = await Station.findOne({ ipAddress: req.body.ipAddress });
  if (station) return res.status(400).send("The Ip Address is already in use.");

  station = new Station({
    description: req.body.description,
    ipAddress: req.body.ipAddress,
    sensors: req.body.sensors,
    creationDate: moment().toJSON()
  });
  await station.save();

  res.send(station);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  var station = await Station.findOne({ ipAddress: req.body.ipAddress });
  if (station) return res.status(400).send("The Ip Address is already in use.");

  station = await Station.findByIdAndUpdate(
    req.params.id,
    {
      description: req.body.description,
      ipAddress: req.body.ipAddress,
      sensors: req.body.sensors
    },
    { new: true }
  );

  if (!station)
    return res.status(404).send("The station with the given ID was not found.");

  res.send(station);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const station = await Station.findByIdAndRemove(req.params.id);

  if (!station)
    return res.status(404).send("The station with the given ID was not found.");

  res.send(station);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const station = await Station.findById(req.params.id).select("-__v");

  if (!station)
    return res.status(404).send("The station with the given ID was not found.");

  res.send(station);
});

module.exports = router;
