import {ExpressError} from "../index.js";

const invalidPathMiddleware = (req, res, next) => next(new ExpressError("Page not Found!", 404))

export default invalidPathMiddleware;