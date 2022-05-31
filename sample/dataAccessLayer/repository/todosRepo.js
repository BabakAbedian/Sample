const useDb = 'mongodb';

let dbQueries = undefined;

switch (useDb) {
    case "mongodb":
        dbQueries = require('../mongoDb/queries');
        break;
    case "todosFile":
        dbQueries = require('../todoFiles/todosFileQueries');
        break;
    default:
        dbQueries = require('../mongoDb/queries');
}


module.exports = dbQueries;

