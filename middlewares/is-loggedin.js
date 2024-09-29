const isLoggedin = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;  // req.path, reset
        req.flash("info", "You must be logged in!");
        return res.redirect('/');
    }
    return next();
};

const saveRedirectUrl = (req, res, next) => { 
    if(req.session.redirectUrl) 
        res.locals.redirectUrl = req.session.redirectUrl; 
    return next();
};

export { isLoggedin, saveRedirectUrl };