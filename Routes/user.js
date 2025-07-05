const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../Models/user.js");
const passport = require("passport");
const { isLogin, saveRedrictUrl } = require("../middleware.js");
const userControllers = require("../controllers/user.js");

router
  .route("/sigup")
  .get(userControllers.renderSingupFome)
  .post(wrapAsync(userControllers.sigupUser));

router
  .route("/login")
  .get(userControllers.renderLoginFome)
  .post(
    saveRedrictUrl,

    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userControllers.loginUser
  );

router.get("/logout", userControllers.logoutUser);

module.exports = router;
