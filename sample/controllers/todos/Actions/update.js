const queries = require('../../../dataAccessLayer/repository/todosRepo');

module.exports = (req, res) => {
    let todos = req.body.Todos;
    if (todos[0] && !todos[1]) {
        res.status(400).send({massage: 'text is required'});
    } else if (todos[0] && todos[1]) {
        queries.updateById('todos', todos[0]._id, todos[1], (err, result) => {
            if (err) res.status(500).send(err);
            else if (result)
                res.send(result);
        })
    } else
        res.status(400).send({massage: 'Bad request'});
}