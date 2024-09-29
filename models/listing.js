import {mongoose, Review} from "../index.js";  

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String
  },
  // image: {
  //   type: String,
  //   default:
  //     "https://images.pexels.com/photos/635279/pexels-photo-635279.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  //   set: v =>
  //     v || "https://images.pexels.com/photos/635279/pexels-photo-635279.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  // },
  price: Number,
  location: String,
  country: String, 
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}); 

listingSchema.post("findOneAndDelete", async listing => {
  if(listing)
    await Review.deleteMany({ _id: { $in: listing.reviews }});
});

export default mongoose.model("Listing", listingSchema);

    