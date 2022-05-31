const express = require('express');
const router = express.Router();

router.use(req => {
    console.log(req.ip.split(':').slice(-1)[0]);
});



router.use(require('./main.route'));
router.use('/todos', require('./todos.route'));
router.use('/auth', require('./auth.route'));


module.exports = router;





