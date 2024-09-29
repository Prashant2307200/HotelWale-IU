import { express,listingRoute,reviewRoute,userRoute } from "../index.js";

const router = express.Router();

router.use('/', userRoute)
router.use("/listings", listingRoute);
listingRoute.use("/:id/reviews", reviewRoute);

export default router;