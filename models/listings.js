const mongoose = require("mongoose");
const { Schema } = mongoose;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String,
            enum: ['point'],
            required: true
        },
        coordinates: {
        type: [Number],
        requires: true
        },
    },
});

listingSchema.post("findOneAndDelete", async () => {
    if(this.reviews.length > 0) {
        await Review.deleteMany({ _id: { $in: this.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;