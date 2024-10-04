const User = require("../Models/user.js");
const passport = require("passport");

module.exports.renderSingupFome = (req, res) => {
  res.render("users/user.ejs");
};

module.exports.sigupUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registerUser = await User.register(newUser, password);
    console.log(registerUser);
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wunderlust");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/sigup");
  }
};

module.exports.renderLoginFome = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.loginUser = (req, res) => {
  req.flash("success", "Welcome back to Wunderlust!");
  console.log(res.locals.redrictUrl);
  let redrictUrl = res.locals.redrictUrl || "/listings";
  res.redirect(redrictUrl);
};

module.exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      req.flash("success", "User logout");
      res.redirect("/listings");
    }
  });
};
