const dbConnect = require('./connectMongoDb').connect;
const mongo = require('./connectMongoDb').mongo;

module.exports = {

    insertOne: (collection, object, next) => {
        try {
            dbConnect((err, dbo) => {
                dbo.collection(collection).insertOne(object, function (err, res) {
                    next(err, res);
                })
            })
        } catch (e) {
            next(e);
        }
    },
    fetchAll: (collection, next) => {
        try {
            dbConnect((err, dbo) => {
                dbo.collection(collection).find({}).toArray((err, res) => {
                    next(err, res);
                });
            })
        } catch (e) {
            next(e);
        }
    },
    deleteById: (collection, object, next) => {
        let deleteObj = {"_id": new mongo.ObjectId(object)};
        dbConnect((err, dbo) => {
            dbo.collection(collection).deleteOne(deleteObj, function (err, res) {
                next(err, res);
            })
        })
    },
    findById: (collection, id, next) => {
        let findObj = {"_id": new mongo.ObjectId(id)};
        dbConnect((err, db) => {
            if (err) next(err);
            else db.collection(collection).findOne(findObj, next);
        })
    },
    updateById: (collection, id, newObj, next) => {
        let findObj = {"_id": new mongo.ObjectId(id)};
        dbConnect((err, db) => {
            if (err) next(err);
            else db.collection(collection).updateOne(findObj, {$set: newObj}, next);
        })
    }
}