const express = require('express')
const router = express.Router();
const todosController = require('../controllers/todos');

router.post('/', todosController.create);
router.get('/', todosController.fetch);
router.delete('/', todosController.delete);
router.put('/', todosController.update);


module.exports = router;