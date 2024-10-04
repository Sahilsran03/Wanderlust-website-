const express = require("express");
const router = express.Router({ mergeParams: true });

const methodOverride = require("method-override");
const wrapAsync = require("../utils/wrapAsync.js");
const reviewControllers = require("../controllers/review.js");

const {
  isLogin,
  isOwner,
  validateReview,
  isAuthor,
} = require("../middleware.js");
// Add review route

router.post(
  "/",
  isLogin,
  validateReview,
  wrapAsync(reviewControllers.createNewReview)
);

//Delete review route
router.delete(
  "/:reviewId",
  isLogin,
  isAuthor,
  wrapAsync(reviewControllers.deleteReview)
);

module.exports = router;
