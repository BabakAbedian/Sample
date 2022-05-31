/**
 * Just few lines to test the behavior.
 */

const TokenGenerator = require('./tokenGenerator');
const jwt = require('jsonwebtoken');

const tokenGenerator = new TokenGenerator(process.env.TOKEN_SECRET, process.env.TOKEN_SECRET,
    {
        algorithm: process.env.algorithms,
        //keyid: '1',
        noTimestamp: false,
        expiresIn: '20m',
        //notBefore: '2s'
    })

token = tokenGenerator.sign({myclaim: 'something'}, {
    audience: process.env.audience,
    issuer: process.env.issuer,
    //jwtid: '1',
    subject: 'user'
})


setTimeout(function () {
    let token2 = tokenGenerator.refresh(token, {verify: {audience: process.env.audience, issuer: process.env.issue}, jwtid: '2'})
    console.log(jwt.decode(token, {complete: true}))
    console.log(jwt.decode(token2, {complete: true}))
}, 3000);