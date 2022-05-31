const path = require('path');
const fs = require('fs');

let todosFilePath = path.resolve(__dirname, './todosFile.json');

module.exports.create = function (todo, next) {
    console.log("todo Post to file");
    fs.readFile(todosFilePath, (err, data) => {
        if (err) {
            next(err);
            return;
        }
        let dataJson = JSON.parse(data);
        dataJson.push(todo);
        data = JSON.stringify(dataJson);

        fs.writeFile(todosFilePath, data, err => {
            next(err, data);
        });
    });
};

module.exports.fetchAll = (next) => {
    console.log("todo get from file");
    fs.readFile(todosFilePath, (err, data) => {
        next(err, JSON.parse(data));
    })
};

module.exports.todoDelete = (todo, next) => {
    fs.readFile(todosFilePath, (err, data) => {
        if (err) {
            next(err);
            return;
        }
        data = JSON.parse(data);
        data = data.filter(d => d.text.trim() !== todo.text.trim());
        data = JSON.stringify(data);

        fs.writeFile(todosFilePath, data, err => {
            next(err,data);
        });
    });
};
