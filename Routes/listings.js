if (process.env.NODE_ENV !="production"){
  require('dotenv').config()
}
const express = require("express");
const router = express.Router();
const listing = require("../Models/listing.js");
const methodOverride = require("method-override");
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema, reviewSchema } = require("../Schema.js");
const { isLogin, isOwner, validateListing } = require("../middleware.js");
const listingControllers = require("../controllers/listing.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});

router
  .route("/")
  .get(wrapAsync(listingControllers.index))
  .post(
    upload.single('listing[image]'),
    validateListing, 
    wrapAsync(listingControllers.newListing));

// # create new listing
router.get("/new", isLogin, listingControllers.newFome);

router
  .route("/:id")
  .put(
    
    isLogin,
    isOwner,
    upload.single('listing[image]'),
    validateListing, 
    wrapAsync(listingControllers.editListingDatabase)
  )
  .delete(isLogin, isOwner, wrapAsync(listingControllers.deleteListing))
  .get(wrapAsync(listingControllers.showListing));

// # edit listing
router.get(
  "/:id/edit",
  isLogin,
  
  isOwner,
  wrapAsync(listingControllers.editListing)
);

module.exports = router;
