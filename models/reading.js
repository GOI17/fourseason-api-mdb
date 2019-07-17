const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const { stationSchema } = require('./station');

const Reading = mongoose.model('Readings', new mongoose.Schema({
    station: {
        type: stationSchema,
        required: true
    },
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
}));

function validateReading(reading) {
    const schema = {
        station: Joi.objectId().required(),
        temperature: Joi.string().required(),
        humidity: Joi.string().required(),
        windQuality: Joi.string().required(),
        dust: Joi.string().required()
    };

    return Joi.validate(reading, schema);
}

exports.Reading = Reading;
exports.validate = validateReading;