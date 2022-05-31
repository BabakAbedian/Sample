const authRoute = require('express').Router();
const controller = require('../controllers/users');

authRoute.post('/login', controller.login);
authRoute.post('/register', controller.register);

module.exports = authRoute;
