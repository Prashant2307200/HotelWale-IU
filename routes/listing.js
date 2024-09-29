import { 
  express,
  multer,
  storage,
  asyncWrapper,
  validation,
  listingSchema,
  listingSetter,
  isLoggedin,
  isOwner,
  index,
  createListing,
  renderNewForm,
  renderListing,
  editListing,
  deleteListing,
  renderEditForm,
} from "../index.js"; 

const router = express.Router();
const upload = multer({ storage });  // { dest: "./public/images/" }

router.param("id", listingSetter); 

router
  .route('/')
  .get(asyncWrapper(index))
  .post(
    isLoggedin, 
    upload.single("listing[image]"),
    validation(listingSchema),
    asyncWrapper(createListing)
  );

router.get("/new", isLoggedin, renderNewForm);

router
  .route("/:id")
  .get(renderListing)
  .put(  
    isLoggedin,
    isOwner,
    upload.single("listing[image]"),
    validation(listingSchema),
    asyncWrapper(editListing)
  )
  .delete(isLoggedin, isOwner, asyncWrapper(deleteListing));

router.get("/:id/edit", isLoggedin, renderEditForm);

export default router;