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


// ////
// mongoose.connect('mongodb://localhost:27017/Dinovate')
//     .then(() => console.log('Connected to MongoDB!'))
//     .catch(err => console.error('Could not connect to MongoDB...', err));

// const cards = [
//     {
//         cardId: 1,
//         cardName: "baby_card_1",
//         price: 19.90,
//         labels: ["baby", "men", "women", "family"],
//         image_location: "/images/cards/baby.jpg"
//     },
//     {
//         cardId: 2,
//         cardName: "baby_card_2",
//         price: 19.90,
//         labels: ["baby", "family"],
//         image_location: "/images/cards/babyboy.jpg"
//     },
//     {
//         cardId: 3,
//         cardName: "baby_card_3",
//         price: 19.90,
//         labels: ["baby", "men", "women", "family"],
//         image_location: "/images/cards/babyboy2.jpg"
//     },
//     {
//         cardId: 4,
//         cardName: "baby_card_4",
//         price: 19.90,
//         labels: ["baby", "men", "women", "family"],
//         image_location: "/images/cards/babyboy3.jpg"
//     },
//     {
//         cardId: 5,
//         cardName: "baby_card_5",
//         price: 19.90,
//         labels: ["baby", "men", "women", "family"],
//         image_location: "/images/cards/babygirl.jpg"
//     },
//     {
//         cardId: 6,
//         cardName: "baby_card_6",
//         price: 19.90,
//         labels: ["baby", "men", "women", "family"],
//         image_location: "/images/cards/babygirl2.jpg"
//     },
//     //////
//     {
//         cardId: 7,
//         cardName: "birthday_card_1",
//         price: 29.90,
//         labels: ["birthday", "men", "women"],
//         image_location: "/images/cards/birthday.jpg"
//     },
//     {
//         cardId: 8,
//         cardName: "birthday_card_2",
//         price: 29.90,
//         labels: ["birthday", "men", "women"],
//         image_location: "/images/cards/birthday2.jpg"
//     },
//     {
//         cardId: 9,
//         cardName: "birthday_card_3",
//         price: 29.90,
//         labels: ["birthday", "men", "women"],
//         image_location: "/images/cards/birthday3.jpg"
//     },
//     {
//         cardId: 10,
//         cardName: "birthday_card_4",
//         price: 29.90,
//         labels: ["birthday", "men", "women"],
//         image_location: "/images/cards/birthday4.jpg"
//     },
//     {
//         cardId: 11,
//         cardName: "birthday_card_5",
//         price: 29.90,
//         labels: ["birthday", "men", "women"],
//         image_location: "/images/cards/birthday5.jpg"
//     },
//     {
//         cardId: 12,
//         cardName: "birthday_card_6",
//         price: 29.90,
//         labels: ["birthday", "men", "women"],
//         image_location: "/images/cards/birthday6.jpg"
//     },
//     {
//         cardId: 13,
//         cardName: "birthday_card_7",
//         price: 29.90,
//         labels: ["birthday", "men", "women"],
//         image_location: "/images/cards/birthday7.jpg"
//     },
//     {
//         cardId: 14,
//         cardName: "birthday_card_8",
//         price: 29.90,
//         labels: ["birthday", "men", "women"],
//         image_location: "/images/cards/birthday8.jpg"
//     },
//     {
//         cardId: 15,
//         cardName: "birthday_card_9",
//         price: 29.90,
//         labels: ["birthday", "men", "women"],
//         image_location: "/images/cards/birthday9.jpg"
//     },
//     {
//         cardId: 16,
//         cardName: "birthday_card_10",
//         price: 29.90,
//         labels: ["birthday", "men", "women"],
//         image_location: "/images/cards/birthday10.jpg"
//     },
//     {
//         cardId: 17,
//         cardName: "birthday_card_11",
//         price: 29.90,
//         labels: ["birthday", "men", "women"],
//         image_location: "/images/cards/birthday11.jpg"
//     },
//     //////
//     {
//         cardId: 18,
//         cardName: "greetings_card_1",
//         price: 39.90,
//         labels: ["greetings"],
//         image_location: "/images/cards/congrats.jpg"
//     },
//     {
//         cardId: 19,
//         cardName: "greetings_card_2",
//         price: 39.90,
//         labels: ["greetings"],
//         image_location: "/images/cards/congrats2.jpg"
//     },
//     {
//         cardId: 20,
//         cardName: "greetings_card_3",
//         price: 39.90,
//         labels: ["greetings"],
//         image_location: "/images/cards/congrats3.jpg"
//     },
//     //////
//     {
//         cardId: 21,
//         cardName: "getwell_card_1",
//         price: 19.90,
//         labels: ["getwell"],
//         image_location: "/images/cards/getwell.jpg"
//     },
//     {
//         cardId: 22,
//         cardName: "getwell_card_2",
//         price: 19.90,
//         labels: ["getwell"],
//         image_location: "/images/cards/getwell2.jpg"
//     },
//     {
//         cardId: 23,
//         cardName: "getwell_card_3",
//         price: 19.90,
//         labels: ["getwell"],
//         image_location: "/images/cards/getwell3.jpg"
//     },
//     {
//         cardId: 24,
//         cardName: "getwell_card_4",
//         price: 19.90,
//         labels: ["getwell"],
//         image_location: "/images/cards/getwell4.jpg"
//     },
//     {
//         cardId: 25,
//         cardName: "getwell_card_5",
//         price: 19.90,
//         labels: ["getwell"],
//         image_location: "/images/cards/getwell5.jpg"
//     },
//     //////
//     {
//         cardId: 26,
//         cardName: "graduation_card_1",
//         price: 49.90,
//         labels: ["greetings"],
//         image_location: "/images/cards/graduation.jpg"
//     },
//     {
//         cardId: 27,
//         cardName: "graduation_card_2",
//         price: 49.90,
//         labels: ["greetings"],
//         image_location: "/images/cards/graduation2.jpg"
//     },
//     {
//         cardId: 28,
//         cardName: "graduation_card_3",
//         price: 49.90,
//         labels: ["greetings"],
//         image_location: "/images/cards/graduation3.jpg"
//     },
//     //////
//     {
//         cardId: 29,
//         cardName: "greetings_card_4",
//         price: 39.90,
//         labels: ["greetings"],
//         image_location: "/images/cards/greetings.jpg"
//     },
//     //////
//     {
//         cardId: 30,
//         cardName: "mum_card_1",
//         price: 59.90,
//         labels: ["women", "family"],
//         image_location: "/images/cards/mum.jpg"
//     },
//     //////
//     {
//         cardId: 31,
//         cardName: "wedding_card_1",
//         price: 79.90,
//         labels: ["men", "women", "family", "wedding",],
//         image_location: "/images/cards/wedding.jpg"
//     },
//     {
//         cardId: 32,
//         cardName: "wedding_card_2",
//         price: 79.90,
//         labels: ["men", "women", "family", "wedding",],
//         image_location: "/images/cards/wedding2.jpg"
//     },
//     {
//         cardId: 33,
//         cardName: "wedding_card_3",
//         price: 79.90,
//         labels: ["men", "women", "family", "wedding"],
//         image_location: "/images/cards/wedding3.jpg"
//     }
// ];
// labels: ["baby", "birthday", "greetings", "men", "women", "family", "wedding", "getwell"]

// Card.insertMany(cards)
//     .then(() => console.log('All cards saved successfully!'))
//     .catch(err => console.error('Error saving cards:', err.message))
//     .finally(() => mongoose.connection.close());