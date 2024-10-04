const listing = require("../Models/listing.js");

module.exports.index = async (req, res) => {
  const allListings = await listing.find();
  res.render("listings/index.ejs", { allListings });
};

module.exports.newFome = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.newListing = async (req, res, next) => {
  let newListing = new listing(req.body.listing);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New Listing created!");
  res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  let allData = await listing.findById(id);
  if (!allData) {
    req.flash("error", "Listing your requsted does not exist!");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { allData });
};

module.exports.editListingDatabase = async (req, res) => {
  let { id } = req.params;

  await listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;

  let deletedListing = await listing.findByIdAndDelete(id);
  // console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  let time = Date.now().toString();
  // console.log(time);
  res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const allData = await listing
    .findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!allData) {
    req.flash("error", "Listing your requsted does not exist!");
    res.redirect("/listings");
  }
  console.log(allData);
  res.render("listings/show.ejs", { allData });
};
