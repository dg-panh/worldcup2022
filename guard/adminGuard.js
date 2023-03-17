const jwt = require('jsonwebtoken');
const SECRET = require('../constant/secret');

function adminGuard(req, res, next) {
    const token = req.session.auth;
    if(!token) {
        res.redirect('/user/login');
        return;
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        const user = decoded._doc;
        if(!user.isAdmin) {
            res.redirect('/?message=You are not admin!');
            return;
        }

        if(err) {
            res.redirect('/user/login');
        } else {
            next();
        }
    })
}

module.exports = adminGuard;