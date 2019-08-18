const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const { sensorSchema } = require("./sensor");

const stationSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },
    ipAddress: {
      type: String,
      required: true,
      maxlength: 15
    },
    sensors: [
      {
        type: sensorSchema,
        required: true
      }
    ]
  },
  { strict: true }
);

const Station = mongoose.model("Station", stationSchema);

function validateStation(station) {
  const schema = {
    description: Joi.string().required(),
    ipAddress: Joi.string()
      .max(12)
      .required(),
    sensors: Joi.array()
      .min(1)
      .items(
        Joi.object({
          _id: Joi.objectId().required(),
          description: Joi.string().required(),
          model: Joi.string().required()
        })
      )
      .required()
  };

  return Joi.validate(station, schema);
}

exports.Station = Station;
exports.stationSchema = stationSchema;
exports.validate = validateStation;
