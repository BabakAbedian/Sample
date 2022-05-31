const _ = require('lodash');
const bcrypt = require('bcryptjs');
const dbQueries = require('../../../dataAccessLayer/repository/userRepo');
const jwt = require('../../../authentication/jwt/generateToken');

module.exports = (req, res) => {
    const credential = _.pick(req.body, ['username', 'password']);
    credential.username = credential.username.toLowerCase();

    dbQueries.findByUsername(credential.username, (err, user) => {
        if (err) res.status(500).send(err);
        else if (!user) res.status(404).send({msg: "User is not exist"});
        else {
            bcrypt
                .compare(credential.password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        delete user.password;
                        jwt.sign(user, (err, token) => {
                            if (err) res.status(500).send(err);
                            else {
                                user.token = token;
                                res.header('Authorization', 'Bearer ' + token);
                                res.redirect('http://localhost:3000');
                                //res.send(user);
                            }
                        })
                    } else {

                        res.status(400).send({msg: "password is wrong"});
                    }
                })
                .catch(
                    err => console.error(err.message)
                );
        }
    })
};
