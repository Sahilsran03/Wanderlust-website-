const listing = require("../Models/listing.js");
const Review = require("../Models/review.js");

module.exports.createNewReview = async (req, res) => {
  let { id } = req.params;
  let list = await listing.findById(id);
  let newreview = new Review(req.body.review);
  newreview.author = req.user._id;
  list.reviews.push(newreview);

  await newreview.save();
  await list.save();
  // console.log("data saved");
  req.flash("success", "New review created!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};
