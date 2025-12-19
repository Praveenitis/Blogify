const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || '#elloWorLd';
const expiresIn = process.env.JWT_EXPIRES_IN || '1d';

function createTokenForUser(user){
    const payload = {
        _id: user._id,
        role: user.role,
    };

    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
}

function validateToken(token){
    const payload = jwt.verify(token, secret);
    return payload;
}

module.exports = {createTokenForUser, validateToken};