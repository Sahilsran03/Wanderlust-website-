const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: String,
    image: {
        type: String,
        set: (v) => v === "" ? "https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" : v,
    },
    price: Number,
    location: String,
    country: String
});

const listing = mongoose.model("listing", listingSchema);
module.exports = listing;