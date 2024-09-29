import {Joi} from './index.js';

const imageSchema = Joi.object({
  url: Joi.string().uri().required(),
  filename: Joi.string().required()
}).allow({}, null);  // Allow null for cases where there might be no image

const listingSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow("", null),
  image: imageSchema,
  location: Joi.string().required(),
  country: Joi.string().required(),
  price: Joi.number().required().min(0), 
}).required();

const reviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().required(),
  createdAt: Joi.date().default('current date')
});

export { listingSchema, reviewSchema };