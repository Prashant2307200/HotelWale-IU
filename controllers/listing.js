import { Listing } from "../index.js";

const index = async (req, res) => { 
    const allListings = await Listing.find();   
    return res.render("./listing/index.ejs", { allListings });
  }

const createListing = async (req, res) => {  
  const listing = new Listing(req.body.listing);
  listing.owner = req.user._id; 
  await listing.save();
  req.flash("success", "New listing was created!"); 
  return res.redirect("/listings");
}

const renderNewForm = (req, res) => res.render("./listing/new.ejs")

const renderListing = (req, res) => res.render("./listing/show.ejs", { listing: req.listing })

const editListing = async (req, res) => {  
  await Listing.findByIdAndUpdate(req.listing._id, req.body.listing, { runValidators: true });
  req.flash("success", "Listing Edited Successfully!");
  return res.redirect(`/listings/${req.listing._id}`);
};

const deleteListing = async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  return res.redirect("/listings");
};

const renderEditForm = (req, res) => {
  let originalImgUrl = req.listing.image.url;
  originalImgUrl = originalImgUrl.replace("/upload", "/upload/w_250"); 
  return res.render("./listing/edit.ejs", { listing: req.listing, originalImgUrl })
};

export {
  index,
  createListing,
  renderNewForm,
  renderListing,
  editListing,
  deleteListing,
  renderEditForm,
};