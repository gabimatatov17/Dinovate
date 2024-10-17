const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    cardId: {
        type: Number,
        required: true,
        unique: true
    },
    cardName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    labels: {
        type: Array,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    image_location: {
        type: String,
        required: true
    }
});

const Card = mongoose.model("Card", cardSchema, "products");
module.exports = Card;
