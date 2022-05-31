//user mongodb queries.js

const db = require('../connectMongoDb');

const queries = {
    create: (credentials, next) => {
        db.connect((err, db) => {
            if (err) next(err);
            else db.collection('users').insertOne(credentials, next);
        })
    },
    findByUsername: (username, next) => {
        db.connect((err, db) => {
            if (err) next(err);
            else db.collection('users').findOne({username}, next);
        })
    }
}

module.exports = queries;