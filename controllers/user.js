import {User} from "../index.js";

const signupUser = async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username }); 
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, err => {
        if(err) {
            return next(err);
        }
        req.flash("info", "Welcome to Hotel Wale!")
        return res.redirect("/listings");
    });
}

const signinUser = (req, res) => {
    req.flash("info", "Welcome back to Hotel Wale!");
    res.redirect(res.locals.redirectUrl ?? "/listings");
}

export { signupUser, signinUser }