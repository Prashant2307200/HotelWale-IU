const isOwner = (req, res, next) => { 
  if(res.locals.user && !req.listing.owner._id.equals(res.locals.user._id)) {
    req.flash("error", "You don't have permission for this listing!");
    return res.redirect(`/listings/${req.listing._id}`)
  }
  return next();
}

export default isOwner;