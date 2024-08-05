const mongoose = require("mongoose");
const listing= require("../Models/listing.js");
const initData= require("./data.js");


main().then((res) => {
    console.log("database is connected");
})
    .catch((err) => {
        console.log(err)
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust1');
}

const initDb= async ()=>{
    await listing.deleteMany({});
    await listing.insertMany(initData.data);
    console.log("data is saved");

}
initDb();