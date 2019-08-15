const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const { sensorSchema, validate } = require("./sensor");

const stationSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  ipAddress: {
    type: String,
    required: true,
    maxlength: 12
  },
  sensor: {
    type: sensorSchema,
    required: true
  }
});

const Station = mongoose.model("Station", stationSchema);

function validateStation(station) {
  const schema = {
    description: Joi.string().required(),
    ipAddress: Joi.string()
      .max(12)
      .required(),
    sensor: Joi.objectId()
  };

  return Joi.validate(station, schema);
}

exports.Station = Station;
exports.stationSchema = stationSchema;
exports.validate = validateStation;
