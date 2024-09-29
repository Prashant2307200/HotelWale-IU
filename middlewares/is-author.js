const isAuthor = (req, res, next) => { 
    if(res.locals.user && !req.review.author._id.equals(res.locals.user._id)) {
      req.flash("error", "You're not author of this review!");
      return res.redirect(`/listings/${req.listing._id}`)
    }
    return next();
  }
  
  export default isAuthor;