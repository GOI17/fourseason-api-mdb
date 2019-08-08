const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = async () => {
    const local_db = config.get('local_db');
    const cloud_db = config.get('cloud_db');

    await mongoose.connect(local_db, { useNewUrlParser: true, useCreateIndex: true })
        .then(() => winston.info(`Connected to ${local_db}...`))
        .catch(async () => {
            winston.info(`Can not connect to ${local_db}, trying to connect to the ${cloud_db}...`)
            await mongoose.connect(cloud_db, { useNewUrlParser: true, useCreateIndex: true })
                .then(() => winston.info(`Connected to ${cloud_db}...`))
                .catch(() => winston.info('Something wrongs with the dbs connection...'));
        })
}