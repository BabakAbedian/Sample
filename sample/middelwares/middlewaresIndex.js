const express = require('express');
const app = express();

// Logger Middleware
const logger = require('./logger/logger');

const middleware = app.use(logger);

module.exports = middleware;




