'use strict';

const joi = require('joi');
const schema = joi.object({
  MONGODB_URI: joi.string().default('mongodb://127.0.0.1:27017/devsdigest'),
  PORT: joi.number().default(5000)
}).unknown().required();

const { error, value: envVars } = joi.validate(process.env, schema);

if (error) throw new Error(`Configuration validation error: ${error.message}`);

const config = {
  mongo: envVars.MONGODB_URI,
  server: {
    port: envVars.PORT
  }
}

module.exports = config;