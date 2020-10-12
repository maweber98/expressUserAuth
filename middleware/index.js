function loggedOut(req, res, next){
    if (req.session && req.session.userID) {
        return res.redirect('/profile');
    } 
    return next();
}

function requiresLogin(req, res, next){
    if (req.session && req.session.userID) {
        return next();
    } else {
        let err = new Error('You must be logged in!');
        err.status = 401;
        return next(err);
    }
}

module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;