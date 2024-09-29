import express from "express";
import path from "path";

import ejsMate from "ejs-mate";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
import bodyParser from "body-parser";
import passport from "passport";
import LocalStrategy from "passport-local";
import passportLocalMongoose from "passport-local-mongoose";
import mongoose from "mongoose";
import multer from "multer";
import Joi from "joi";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import os from "os";
import cluster from "cluster";

import flashMsg from "./middlewares/flash-msg.js";
import invalidPathHandler from "./middlewares/invalid-path-handler.js";
import errHandler from "./middlewares/err-handler.js";
import { saveRedirectUrl } from "./middlewares/is-loggedin.js";
import isAuthor from "./middlewares/is-author.js";
import isOwner from "./middlewares/is-owner.js";
import validation from "./middlewares/validate.js";
import { listingSetter, reviewSetter } from "./middlewares/setter.js";
import { isLoggedin } from "./middlewares/is-loggedin.js";

import db from "./utils/db.js";
import ExpressError from "./utils/express-error.js";
import asyncWrapper from "./utils/async-wrapper.js";

import User from "./models/user.js";
import Listing from "./models/listing.js";
import Review from "./models/review.js";

import { reviewSchema,listingSchema } from "./schema.js";

import { signinUser, signupUser } from "./controllers/user.js";
import { createReview, deleteReview } from "./controllers/review.js";
import { 
    index,
    createListing,
    renderNewForm,
    renderListing,
    editListing,
    deleteListing,
    renderEditForm
} from "./controllers/listing.js";

import { storage } from "./cloud-config.js";

import listingRoute from "./routes/listing.js";
import reviewRoute from "./routes/review.js";
import userRoute from "./routes/user.js";
import router from "./routes/router.js";

export { 
    cluster,
    os,
    express,
    path,
    ejsMate,
    methodOverride,
    cookieParser,
    session,
    flash,
    bodyParser,
    passport,
    LocalStrategy,
    mongoose,
    multer,
    flashMsg,
    router,
    invalidPathHandler,
    errHandler,
    db,
    ExpressError,
    asyncWrapper,
    User,
    Listing,
    Review,
    listingRoute,
    reviewRoute,
    userRoute,
    signinUser,
    signupUser,
    saveRedirectUrl,
    reviewSchema,
    listingSchema, 
    index,
    createListing,
    renderNewForm,
    renderListing,
    editListing,
    deleteListing,
    renderEditForm,
    isOwner,
    isAuthor,
    validation,
    isLoggedin,
    listingSetter,
    reviewSetter,
    createReview,
    deleteReview,
    Joi,
    cloudinary,
    CloudinaryStorage,
    passportLocalMongoose,
    storage
};
