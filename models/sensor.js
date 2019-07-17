const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    }
});

const Sensor = mongoose.model('Sensor', sensorSchema);

function validateSensor(sensor) {
    const schema = {
        description: Joi.string().required(),
        model: Joi.string().required()
    };

    return Joi.validate(sensor, schema);
}

exports.sensorSchema = sensorSchema;
exports.Sensor = Sensor;
exports.validate = validateSensor;