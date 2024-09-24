const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true,
        unique: true
    },
    customerId: {
        type: Number,
        required: true
    },
    cards: {
        type: Array,
        required: true
    },
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

// Example of cards array type
// cards = [
//     {
//         cardId: cardId,
//         greeting: "Happy Birthday"
//     }
// ]



////
// mongoose.connect('mongodb://localhost:27017/Dinovate')
//     .then(() => console.log('Connected to MongoDB!'))
//     .catch(err => console.error('Could not connect to MongoDB...', err));

// const orders = [
//     {
//         orderId: 1,
//         customerId: 6,
//         cards: [
//             {
//                 cardId: 7,
//                 greeting: "Happy Birthday Victoria!"
//             }
//         ],
//         totalPrice: 19.90,
//         shippingAdress: "45 Rothschild Boulevard, Tel Aviv-Yafo, 65784, Israel"
//     },
//     {
//         orderId: 2,
//         customerId: 7,
//         cards: [
//             {
//                 cardId: 21,
//                 greeting: "Get Well Soon Jude!"
//             }
//         ],
//         totalPrice: 19.90,
//         shippingAdress: "123 Baker Street, London, NW1 6XE, United Kingdom"
//     },
//     {
//         orderId: 3,
//         customerId: 7,
//         cards: [
//             {
//                 cardId: 8,
//                 greeting: "Happy Birthday Megan!"
//             },
//             {
//                 cardId: 21,
//                 greeting: "Get Well Soon David!"
//             }
//         ],
//         totalPrice: 39.80,
//         shippingAdress: "123 Baker Street, London, NW1 6XE, United Kingdom"
//     }
// ];

// Order.insertMany(orders)
//     .then(() => console.log('All orders saved successfully!'))
//     .catch(err => console.error('Error saving orders:', err.message))
//     .finally(() => mongoose.connection.close());