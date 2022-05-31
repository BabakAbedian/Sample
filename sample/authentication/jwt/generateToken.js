const jwt = require('jsonwebtoken');
const dbQueries = require('../../dataAccessLayer/repository/userRepo');

module.exports.sign = (user, next) => {
    dbQueries.findByUsername(user.username, (err, user) => {
        if (err) next(err);
        else if (!user) next(new Error("User is not exist"));
        else {
            jwt.sign({
                    _id: user._id,
                    username: user.username
                },
                process.env.TOKEN_SECRET,
                {
                    algorithm: process.env.algorithms,
                    //keyid: '1',
                    noTimestamp: false,
                    expiresIn: '20m',
                    //notBefore: '2s'
                }, (err, token) => {
                    next(err, token);
                });
        }
    });
}
module.exports.verify = (token, next) => {

    if (token) next(new Error('Token is not exist'));
    else {
        jwt.verify(token,
            process.env.TOKEN_SECRET,
            {audience: process.env.audience, issuer: process.env.issue},
            (err, payload) => {
                if (err) next(err);
                else {
                    delete payload.iat;
                    delete payload.exp;
                    //delete payload.nbf;
                    //delete payload.jti;
                    jwt.sign({
                            _id: user._id,
                            username: user.username
                        },
                        process.env.TOKEN_SECRET,
                        {
                            algorithm: process.env.algorithms,
                            //keyid: '1',
                            noTimestamp: false,
                            expiresIn: '20m',
                            //notBefore: '2s'
                        },
                        (err, token) => {
                            let user = {_id: payload._id, username: payload.username, token: token}
                            next(err, user);
                        });
                }
            });
    }
}