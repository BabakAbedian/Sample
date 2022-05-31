const queries = require('../../../dataAccessLayer/repository/todosRepo');
const express = require("express");

module.exports = (req, res) => {
    const fetch = function () {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];
        queries.fetchAll('todos',(err, data) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.send(data);
        });
    };
    fetch();
};
