const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true,
        unique: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    cards: [{
        cardId: { type: Number, required: true },
        greeting: { type: String, required: true }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    shippingAdress: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model("Order", orderSchema, "orders");
module.exports = Order;
