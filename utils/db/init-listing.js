import mongoose from "mongoose";
import Listing from "../../models/listing.js";
import sampleListing from "./listing.js";

await mongoose.connect("mongodb://127.0.0.1:27017/hotelwale");

await Listing.deleteMany({});
await Listing.insertMany(sampleListing);

await mongoose.connection.close();