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
      }
    },
    { strict: true }
  )
);

function validateReading(reading) {
  const schema = {
    stationId: Joi.objectId().required(),
    values: Joi.object({
      temperature: Joi.number().required(),
      humidity: Joi.number().required(),
      windQuality: Joi.number().required(),
      dust: Joi.number().required()
    }).required()
  };

  return Joi.validate(reading, schema);
}

exports.Reading = Reading;
exports.validate = validateReading;
