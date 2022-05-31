const _ = require('lodash');
const bcrypt = require('bcryptjs');
const dbQueries = require('../../../dataAccessLayer/repository/userRepo');
const jwt = require('../../../authentication/jwt/generateToken');

module.exports = (req, res) => {
    const credentials = _.pick(req.body, ['username', 'password']);
    credentials.username = credentials.username.toLowerCase();

    dbQueries.findByUsername(credentials.username, (err, result) => {
        if (err) res.status(500).send(err);
        else if (result) res.status(400).send({msg: "User is exist"});
        else {
            bcrypt
                .genSalt(10)
                .then(salt => {
                    return bcrypt.hash(credentials.password, salt);
                })
                .then(hashedPassword => {
                    // Store credentials in DB.
                    dbQueries.create(({username: credentials.username, password: hashedPassword}), (err, result) => {
                        if (err)
                            res.status(500).send(err);
                        else {
                            delete result.password;
                            jwt(result, (err, token) => {
                                if (err) res.status(500).send(err);
                                else {
                                    result.token = token;
                                    res.send(result);
                                }
                            })
                        }
                    });
                })
                .catch(err => console.error(err.message));
        }
    })
};