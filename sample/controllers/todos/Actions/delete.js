const queries = require('../../../dataAccessLayer/repository/todosRepo');

module.exports = (req, res) => {
    const todo = req.body;

    if (!todo) {
        res.status(400).send({massage: 'text is required'});
        return;
    }
    if (Object.keys(todo).length === 0) {
        res.status(400).send({massage: 'text is empty'});
        return;
    }
    const deleteTodo =
        function (todo) {
            let id = undefined;
            if (todo._id) id = todo._id;
            else if (todo.id) id = todo.id
            queries.deleteById('todos', id, (err, result) => {
                if (err) res.status(500).send(err.errmsg);
                else {
                    if (result.deletedCount === 1) {
                        res.send("Successfully deleted one document.");
                    } else {
                        res.send( "No documents matched the query. Deleted 0 documents.");
                    }
                }
            });
        };
    deleteTodo(todo);
};