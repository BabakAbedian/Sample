
// user repository

const useDb = 'mongodb';

let dbQueries = undefined;

switch (useDb) {
    case "mongodb":
        dbQueries = require('../mongoDb/users/queries');
        break;
    default:
        dbQueries = require('../mongoDb/users/queries');
}


module.exports = dbQueries;