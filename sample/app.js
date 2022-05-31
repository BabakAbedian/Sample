const express = require('express');
const app = express();
const db = require('./dataAccessLayer/sqlServer/connectSql');

require('./config');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

try {
    db.sequelize.sync({ force: true }).then(() => {
        console.log("Drop and re-sync db.");
    });
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.use(express.static(__dirname + '/public'));

const appMiddlewares = require('./middelwares/middlewaresIndex');
app.use(appMiddlewares);

const appRouter = require('./routes/index.routers');
app.use(appRouter);

module.exports = app;

