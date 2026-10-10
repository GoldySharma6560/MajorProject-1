const mongoose = require("mongoose");
const Listing = require("../models/listings.js");
const initData = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1/Nestora";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async() => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, 
        owner: "64a0e7f5c1b8f3e5d6a1b2c3"
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();