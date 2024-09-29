import {
  express,
  asyncWrapper,
  reviewSchema,
  validation,
  createReview,
  deleteReview,
  reviewSetter,
  isAuthor,
  isLoggedin
} from "../index.js"; 

const router = express.Router({ mergeParams: true });

router.param("id", reviewSetter);

router.post(
  '/',
  isLoggedin,
  validation(reviewSchema),
  asyncWrapper(createReview)
); 

router.delete(
  "/:id", 
  isLoggedin,
  isAuthor,
  asyncWrapper(deleteReview)
);

export default router;
