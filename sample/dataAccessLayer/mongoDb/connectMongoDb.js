const mongo = require('mongodb');
const mongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/todosDb";

let theMongoDB = undefined;

const connectMongoDb = (next) => {
    if (theMongoDB) {
        next(null, theMongoDB);
        return;
    }
    mongoClient.connect(url, function (err, client) {
        if (err) next(err);
        else {
            theMongoDB = client.db();
            next(null, theMongoDB);
        }
    })
};
module.exports.connect = connectMongoDb;
module.exports.mongo = mongo;