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
          type: String,
          required: true
        },
        humidity: {
          type: String,
          required: true
        },
        windQuality: {
          type: String,
          required: true
        },
        dust: {
          type: String,
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
      temperature: Joi.string().required(),
      humidity: Joi.string().required(),
      windQuality: Joi.string().required(),
      dust: Joi.string().required()
    }).required()
  };

  return Joi.validate(reading, schema);
}

exports.Reading = Reading;
exports.validate = validateReading;
