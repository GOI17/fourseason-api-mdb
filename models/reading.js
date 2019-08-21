const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const { stationSchema } = require("./station");

const Reading = mongoose.model(
  "Readings",
  new mongoose.Schema(
    {
      station: {
        type: stationSchema,
        required: true
      },
      values: {
        temperature: {
          type: Number,
          required: true
        },
        humidity: {
          type: Number,
          required: true
        },
        windQuality: {
          type: Number,
          required: true
        },
        dust: {
          type: Number,
          required: true
        }
      },
      creationDate: {
        type: String,
        required: true
      }
    },
    { strict: true }
  )
);

function validateReading(reading) {
  const schema = {
    stationId: Joi.objectId().required(),
    values: Joi.object({
      t: Joi.number().required(),
      h: Joi.number().required(),
      w: Joi.number().required(),
      d: Joi.number().required()
    }).required()
  };

  return Joi.validate(reading, schema);
}

exports.Reading = Reading;
exports.validate = validateReading;
