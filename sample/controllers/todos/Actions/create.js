const queries = require('../../../dataAccessLayer/repository/todosRepo');

module.exports = (req, res) => {

    const todo = req.body;
    if (!todo) {
        res.status(400).send({massage: 'text is required'});
    }

    //CreateTodo
    const createTodo = function (todo) {
        queries.insertOne('todos', todo, (err, result) => {
            if (err)
                res.status(500).send(err.errmsg);
            else
                queries.findById('todos', result.insertedId, (err, result) => {
                    if (err)
                        res.status(500).send(err.errmsg);
                    else if (result) {
                        res.send(result);
                    } else {
                        res.status(500).send('insert todo failed');
                    }
                })

        });
    };
    createTodo(todo);
};