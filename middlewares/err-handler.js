const errorHandler = async (err, req, res, next) => {
    const { name, stack, status = 500, message = "Internal Server Error" } = err;
    req.flash("error", message);
    return res.status(status).redirect("/listings"); 
  }
  
  export default errorHandler;