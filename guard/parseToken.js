const jwt = require('jsonwebtoken');
const SECRET = require('../constant/secret');

function parseToken(req, res, next) {
    console.log('here');
    const token = req.session.auth;
    res.locals.isAuth = false;
    if(!token) {
        return next();
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        const user = decoded._doc;
        res.locals.user = user;
        res.locals.isAuth = decoded['isAuth'];
        res.locals.isAdmin = user.isAdmin;
        if(err) {
            return res.redirect('/user/login');
        } else {
            next();
        }
    })
}

module.exports = parseToken;