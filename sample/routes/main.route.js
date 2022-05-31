const mainRouter = require('express').Router();
const path = require('path');


mainRouter.get('/', (req, res) => {
    console.log('get to index');
    res.sendFile(path.resolve(__dirname, '/index.html'))
});

mainRouter.get('/login', (req, res) => {
    console.log('login.html');
    res.sendFile(path.resolve(__dirname, '/login.html'))
});


module.exports = mainRouter;