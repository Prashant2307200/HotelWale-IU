import { 
  express,passport,asyncWrapper,signinUser,signupUser,saveRedirectUrl 
} from "../index.js";  

const router = express.Router();

router.get('/', (req, res) => res.render("./user/index.ejs"));

router.post("/signup", asyncWrapper(signupUser))

router.post("/signin", 
  saveRedirectUrl,
  passport.authenticate("local", { 
      failureRedirect: "/", 
      failureFlash: true 
  }),
  signinUser
);

router.get("/logout", (req, res) => {
  req.logout(err => {
    if(err) {
      return next(err);
    }
    req.flash("info", "You are logged out!");
    return res.redirect("/listings");
  });
});

export default router;