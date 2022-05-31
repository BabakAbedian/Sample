const fs = require('fs');
const path = require('path');

const logDirPath = path.resolve(__dirname, '../../logs');
const logFilePath = path.resolve(logDirPath.concat('/req.json'));


module.exports = (req, res, next) => {

    fs.exists(logDirPath, (isExist) => {
        if (!isExist) {
            fs.mkdir(logDirPath, (err) => {
                if (err) {
                    res.status(500).send(err);
                    console.log('create log file failed!');
                }
            })
        }
    });
    saveLog(req);
    next();
};

const saveLog = (req) => {
    try {
        let data = {url: req.baseUrl, header: req.header, body: req.body, date: Date.now()};
        data = '\n' + JSON.stringify(data);
        fs.appendFile(logFilePath, data, (err) => {
            if (err) {
                console.log(err);
            }
        })
    } catch (e) {
        console.log(e);
    }
};