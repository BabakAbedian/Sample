// todos/controllers

const controller = {
    create: require('./Actions/create'),
    fetch: require('./Actions/fetchAll'),
    delete: require('./Actions/delete'),
    update: require('./Actions/update'),
}

module.exports = controller;