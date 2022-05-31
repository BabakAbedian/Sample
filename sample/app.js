const express = require('express');
const app = express();

require('./config');

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(express.static(__dirname + '/public'));

const appMiddlewares = require('./middelwares/middlewaresIndex');
app.use(appMiddlewares);

const appRouter = require('./routes/index.routers');
app.use(appRouter);

module.exports = app;

