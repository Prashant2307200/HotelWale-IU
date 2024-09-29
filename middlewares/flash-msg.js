const flashMsg = (req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.info = req.flash("info");
    res.locals.user = req.user; 
    next();
  };

  export default flashMsg;