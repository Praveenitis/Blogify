const jwt = require('jsonwebtoken');
const { validateToken } = require('../utils/auth');

const authhandler = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) return res.render('signin', { error: 'Invalid User , Please login again' });

    try {
        const payload = validateToken(token);
        if (!payload) return res.render('signin', { error: 'Invalid User , Please login again' });
        req.user = payload;
        return next();
    } catch (error) {
        console.log('Some error occured in Auth', error);
        return res.render('signin', { error: 'Some unknown error occurred.' });
    }
};

module.exports = authhandler;