const mongoose = require("mongoose");
const listing = require("../Models/listing.js");
const initData = require("./data.js");

main()
  .then((res) => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust1");
}

const initDb = async () => {
  await listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "66dd4f9a08e7c6691b893110",
  }));
  await listing.insertMany(initData.data);
  console.log("data is saved");
};
initDb();
