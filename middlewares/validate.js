import {ExpressError} from "../index.js";

const validation = schema => (req, res, next) => {   
    if(req.file) {
        req.body.listing ??= {};
        req.body.listing.image = { url: req.file.path, filename: req.file.filename }; 
    }
    const { error } = schema.validate(req.body.listing); // obj of value and error obj
    if (error) {
        const errMsg = error.details.map(err => err.message).join(", "); 
        throw new ExpressError(`Send valid data for Listing, ${errMsg}`, 400); // Listing not Found, 404
    } 
    return next();
};

export default validation;


 