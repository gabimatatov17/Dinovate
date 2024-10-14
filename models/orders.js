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
//         customerId: new mongoose.Types.ObjectId('66e9c7c00664e7375818f765'), // Use mongoose.Types.ObjectId()
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
//         customerId: new mongoose.Types.ObjectId('66e9c7c00664e7375818f766'), // Use mongoose.Types.ObjectId()
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
//         customerId: new mongoose.Types.ObjectId('66e9c7c00664e7375818f766'), // Use mongoose.Types.ObjectId()
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
//     },
//     {
//         orderId: 4,
//         customerId: new mongoose.Types.ObjectId('670d5bd062ee14d86ec00b2b'),
//         cards: [
//             {
//                 cardId: 1,
//                 greeting: "Congratulations on your new bundle of joy!"
//             },
//             {
//                 cardId: 12,
//                 greeting: "Happy Birthday Luis!"
//             }
//         ],
//         totalPrice: 49.8,
//         shippingAdress: "23 HaYarden St, Tel Aviv",
//         dateCreated: new Date('2024-07-10')
//     },
//     //
//     {
//         orderId: 5,
//         customerId: new mongoose.Types.ObjectId('670d5bd062ee14d86ec00b2c'),
//         cards: [
//             {
//                 cardId: 25,
//                 greeting: "May The FORCE be with you! Get Well Soon!"
//             }
//         ],
//         totalPrice: 19.9,
//         shippingAdress: "42 Rothschild Blvd, Jerusalem",
//         dateCreated: new Date('2024-07-25')
//     },
//     //
//     {
//         orderId: 6,
//         customerId: new mongoose.Types.ObjectId('670d5bd062ee14d86ec00b2d'),
//         cards: [
//             {
//                 cardId: 4,
//                 greeting: "Congratulations on the arrival of your little angel!"
//             }
//         ],
//         totalPrice: 19.9,
//         shippingAdress: "15 Ben Gurion St, Haifa",
//         dateCreated: new Date('2024-08-05')
//     },
//     //
//     {
//         orderId: 7,
//         customerId: new mongoose.Types.ObjectId('670d5bd062ee14d86ec00b2e'),
//         cards: [
//             {
//                 cardId: 19,
//                 greeting: "Congratulations on finishing that degree!"
//             }
//         ],
//         totalPrice: 39.9,
//         shippingAdress: "67 Herzl St, Be'er Sheva",
//         dateCreated: new Date('2024-08-18')
//     },
//     //
//     {
//         orderId: 8,
//         customerId: new mongoose.Types.ObjectId('670d5bd062ee14d86ec00b2f'),
//         cards: [
//             {
//                 cardId: 17,
//                 greeting: "Happy Birthday Bill Gates!"
//             }
//         ],
//         totalPrice: 29.9,
//         shippingAdress: "12 Shalom Aleichem St, Ramat Gan",
//         dateCreated: new Date('2024-08-30')
//     },
//     //
//     {
//         orderId: 9,
//         customerId: new mongoose.Types.ObjectId('670d5bd062ee14d86ec00b30'),
//         cards: [
//             {
//                 cardId: 33,
//                 greeting: "Congratulations on your beautiful wedding! May your life together be filled with love, joy, and endless laughter."
//             }
//         ],
//         totalPrice: 79.9,
//         shippingAdress: "88 Weizmann St, Petah Tikva",
//         dateCreated: new Date('2024-09-12')
//     },
//     //
//     {
//         orderId: 10,
//         customerId: new mongoose.Types.ObjectId('670d5bd062ee14d86ec00b31'),
//         cards: [
//             {
//                 cardId: 22,
//                 greeting: "Get well soon Zendaya!"
//             }
//         ],
//         totalPrice: 19.9,
//         shippingAdress: "5 Bialik St, Ashdod",
//         dateCreated: new Date('2024-09-20')
//     },
//     //
//     {
//         orderId: 11,
//         customerId: new mongoose.Types.ObjectId('670d5bd062ee14d86ec00b32'),
//         cards: [
//             {
//                 cardId: 7,
//                 greeting: "Happy birthday Junior!"
//             }
//         ],
//         totalPrice: 29.9,
//         shippingAdress: "33 Dizengoff St, Tel Aviv",
//         dateCreated: new Date('2024-09-27')
//     },
//     //
//     {
//         orderId: 12,
//         customerId: new mongoose.Types.ObjectId('670d5bd062ee14d86ec00b33'),
//         cards: [
//             {
//                 cardId: 32,
//                 greeting: "Wishing you a lifetime of love and happiness as you begin your journey together!!"
//             }
//         ],
//         totalPrice: 79.9,
//         shippingAdress: "9 Haganah St, Netanya",
//         dateCreated: new Date('2024-10-01')
//     },
//     //
//     {
//         orderId: 13,
//         customerId: new mongoose.Types.ObjectId('670d5bd062ee14d86ec00b34'),
//         cards: [
//             {
//                 cardId: 14,
//                 greeting: "Happy birthday Haaland!"
//             }
//         ],
//         totalPrice: 29.9,
//         shippingAdress: "44 Jabotinsky St, Herzliya",
//         dateCreated: new Date('2024-10-05')
//     },
//     //
//     {
//         orderId: 14,
//         customerId: new mongoose.Types.ObjectId('670d5bd062ee14d86ec00b35'),
//         cards: [
//             {
//                 cardId: 23,
//                 greeting: "Get Well Soon Pep!"
//             }
//         ],
//         totalPrice: 19.9,
//         shippingAdress: "11 Ibn Gabirol St, Rishon LeZion",
//         dateCreated: new Date('2024-10-10')
//     },
//     //
//     {
//         orderId: 15,
//         customerId: new mongoose.Types.ObjectId('670d5bd062ee14d86ec00b36'),
//         cards: [
//             {
//                 cardId: 20,
//                 greeting: "Go Sister!"
//             }
//         ],
//         totalPrice: 39.9,
//         shippingAdress: "27 HaNassi St, Eilat",
//         dateCreated: new Date('2024-10-12')
//     },
//     //
//     {
//         orderId: 16,
//         customerId: new mongoose.Types.ObjectId('670d5bd062ee14d86ec00b37'),
//         cards: [
//             {
//                 cardId: 26,
//                 greeting: "Amazing Work!"
//             }
//         ],
//         totalPrice: 49.9,
//         shippingAdress: "7 Shalom Street, Tel Aviv, Israel",
//         dateCreated: new Date('2024-10-14')
//     }
// ]


// Order.insertMany(orders)
//     .then(() => console.log('All orders saved successfully!'))
//     .catch(err => console.error('Error saving orders:', err.message))
//     .finally(() => mongoose.connection.close());
