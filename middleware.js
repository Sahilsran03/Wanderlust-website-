const listing = require("./Models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./Schema.js");
const review = require("./Models/review.js");

module.exports.isLogin = (req, res, next) => {
  console.log(req.originalUrl);
  if (!req.isAuthenticated()) {
    req.session.redrictUrl = req.originalUrl;
    req.flash("error", "You are not login. plese login!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedrictUrl = (req, res, next) => {
  if (req.session.redrictUrl) {
    res.locals.redrictUrl = req.session.redrictUrl;
    // console.log( req.locals.redrictUrl)
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let list = await listing.findById(id);
  if (!list.owner._id.equals(res.locals.crruntUser._id)) {
    req.flash("error", "You are not a Owner");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let list = await review.findById(reviewId);
  if (!list.author._id.equals(res.locals.crruntUser._id)) {
    req.flash("error", "You are not a Author of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
