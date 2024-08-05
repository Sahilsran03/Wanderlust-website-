const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./Models/listing.js");
const path = require("path");
const methodOverride=require("method-override");
const ejsMate = require('ejs-mate');



main().then((res) => {
    console.log("database is connected");
})
    .catch((err) => {
        console.log(err)
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust1');
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/", (req, res) => {
    res.send("root is working");
});

// # insex route

app.get("/listings", async (req, res) => {
    const allListings = await listing.find();
    res.render("listings/index.ejs", { allListings });


});

// # create new listing
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// # data adding
app.post("/listings", (req, res,next) => {
    try {
        let newListing = new listing(req.body.listing);
    newListing.save();
    res.redirect("/listings");
    } catch (err) {
        next(err);
    }
      
});


// # edit listing
app.get("/listings/:id/edit", async(req,res)=>{
    let {id}= req.params;
    let allData=await listing.findById(id);
    res.render("listings/edit.ejs",{allData});
});
app.put("/listings/:id",async (req,res)=>{
    let {id}= req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});

// # delete route 
app.delete("/listings/:id",async (req,res)=>{
    let {id}= req.params;
    let deletedListing= await listing.findByIdAndDelete(id);
    console.log(deletedListing);
    let time=  (Date.now()).toString();
    console.log(time);
    res.redirect("/listings");
});

// # show route
app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;
    const allData = await listing.findById(id);
    // console.log(allData);
    res.render("listings/show.ejs", { allData });
});



// app.get("/test", async (req,res)=>{
//     let semplelisting= new listing({
//         tital:"sweet home",
//         discription:"good home",
//         price:1000,
//         location:"moonk",
//         country:"punjab",
//     });
//     await semplelisting.save()
//     console.log("samplw was saved");
//     res.send("it is working");
// })
app.use((err,req,res,next)=>{
    res.send("somthing went woring");
});


app.listen(8080, () => {
    console.log("server is listen")
});
