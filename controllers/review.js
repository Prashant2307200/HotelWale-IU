import {Review, Listing} from "../index.js"; 

const createReview = async (req, res) => {  
    const listing = req.listing;
    const newReview = new Review(req.body.review);  
    newReview.author = req.user._id; 
    listing.reviews.push(newReview); 
    await newReview.save();  // saved review
    await listing.save();  // saved listing  
    req.flash("success", "Review added!")
    return res.redirect(`/listings/${listing._id}`); 
};

const deleteReview = async (req, res) => {
    const { listing, review } = req;  
    await Listing.findByIdAndUpdate(listing._id, { $pull: { reviews: review._id }});  // delInstance
    await Review.findByIdAndDelete(review._id);  // delReview
    req.flash("success", "Review deleted!")
    return res.redirect(`/listings/${listing._id}`);
};

export { createReview, deleteReview };