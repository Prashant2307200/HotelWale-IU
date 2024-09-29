import { Listing,Review } from "../index.js";

const listingSetter = async (req, res, next, id) => {
  try {
    const listing = await Listing
      .findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author"
        }
      })
      .populate("owner");
    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }
    req.listing = listing;
    return next();
  } catch (err) {
    next(err);
  }
};

const reviewSetter = async(req, res, next, id) => { 
  try {
    const review = await Review.findById(id); //req.params.id 
    if (!review) {
      req.flash("error", "Review you requested for does not exist!");
      return res.redirect(`/listings/${req.listing._id}`);
    }
    req.review = review;
    return next();
  } catch (err) {
    next(err);
  }
}

export { listingSetter, reviewSetter };