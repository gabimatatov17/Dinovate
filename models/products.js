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
//         cardName: "Two Becomes Three Baby Card",
//         price: 19.90,
//         labels: ["baby", "men", "women", "family"],
//         image_location: "/images/cards/baby.jpg"
//     },
//     {
//         cardId: 2,
//         cardName: "Baby Boy Card",
//         price: 19.90,
//         labels: ["baby", "family"],
//         image_location: "/images/cards/babyboy.jpg"
//     },
//     {
//         cardId: 3,
//         cardName: "Elephant Baby Card",
//         price: 19.90,
//         labels: ["baby", "men", "women", "family"],
//         image_location: "/images/cards/babyboy2.jpg"
//     },
//     {
//         cardId: 4,
//         cardName: "Football Baby Boy Card",
//         price: 19.90,
//         labels: ["baby", "men", "women", "family"],
//         image_location: "/images/cards/babyboy3.jpg"
//     },
//     {
//         cardId: 5,
//         cardName: "Baby Girl Card",
//         price: 19.90,
//         labels: ["baby", "men", "women", "family"],
//         image_location: "/images/cards/babygirl.jpg"
//     },
//     {
//         cardId: 6,
//         cardName: "Stork Baby Card",
//         price: 19.90,
//         labels: ["baby", "men", "women", "family"],
//         image_location: "/images/cards/babygirl2.jpg"
//     },
//     //////
//     {
//         cardId: 7,
//         cardName: "Form Birthday Card",
//         price: 29.90,
//         labels: ["birthday", "men", "women"],
//         image_location: "/images/cards/birthday.jpg"
//     },
//     {
//         cardId: 8,
//         cardName: "Cute Peas Birthday Card",
//         price: 29.90,
//         labels: ["birthday", "men", "women"],
//         image_location: "/images/cards/birthday2.jpg"
//     },
//     {
//         cardId: 9,
//         cardName: "Dancing Taco Birthday Card",
//         price: 29.90,
//         labels: ["birthday", "men", "women"],
//         image_location: "/images/cards/birthday3.jpg"
//     },
//     {
//         cardId: 10,
//         cardName: "Cute Toast Birthday Card",
//         price: 29.90,
//         labels: ["birthday", "men", "women"],
//         image_location: "/images/cards/birthday4.jpg"
//     },
//     {
//         cardId: 11,
//         cardName: "Get Drunk Birthday Card",
//         price: 29.90,
//         labels: ["birthday", "men", "women"],
//         image_location: "/images/cards/birthday5.jpg"
//     },
//     {
//         cardId: 12,
//         cardName: "Puppy Holding Beer Birthday Card",
//         price: 29.90,
//         labels: ["birthday", "men", "women"],
//         image_location: "/images/cards/birthday6.jpg"
//     },
//     {
//         cardId: 13,
//         cardName: "Tipex Birthday Card",
//         price: 29.90,
//         labels: ["birthday", "men", "women"],
//         image_location: "/images/cards/birthday7.jpg"
//     },
//     {
//         cardId: 14,
//         cardName: "Chilling Snoopy Birthday Card",
//         price: 29.90,
//         labels: ["birthday", "men", "women"],
//         image_location: "/images/cards/birthday8.jpg"
//     },
//     {
//         cardId: 15,
//         cardName: "Puppy Girl Birthday Card",
//         price: 29.90,
//         labels: ["birthday", "men", "women"],
//         image_location: "/images/cards/birthday9.jpg"
//     },
//     {
//         cardId: 16,
//         cardName: "Margarita Birthday Card",
//         price: 29.90,
//         labels: ["birthday", "men", "women"],
//         image_location: "/images/cards/birthday10.jpg"
//     },
//     {
//         cardId: 17,
//         cardName: "Gaming Birthday Card",
//         price: 29.90,
//         labels: ["birthday", "men", "women"],
//         image_location: "/images/cards/birthday11.jpg"
//     },
//     //////
//     {
//         cardId: 18,
//         cardName: "Cowngratulations Greeting Card",
//         price: 39.90,
//         labels: ["greetings"],
//         image_location: "/images/cards/congrats.jpg"
//     },
//     {
//         cardId: 19,
//         cardName: "Books Greeting Card",
//         price: 39.90,
//         labels: ["greetings"],
//         image_location: "/images/cards/congrats2.jpg"
//     },
//     {
//         cardId: 20,
//         cardName: "Zesty Greeting Card",
//         price: 39.90,
//         labels: ["greetings"],
//         image_location: "/images/cards/congrats3.jpg"
//     },
//     //////
//     {
//         cardId: 21,
//         cardName: "General Get Well Card",
//         price: 19.90,
//         labels: ["getwell"],
//         image_location: "/images/cards/getwell.jpg"
//     },
//     {
//         cardId: 22,
//         cardName: "Big Hugs Get Well Card",
//         price: 19.90,
//         labels: ["getwell"],
//         image_location: "/images/cards/getwell2.jpg"
//     },
//     {
//         cardId: 23,
//         cardName: "Recovery Get Well Card",
//         price: 19.90,
//         labels: ["getwell"],
//         image_location: "/images/cards/getwell3.jpg"
//     },
//     {
//         cardId: 24,
//         cardName: "Hedgehog Get Well Card",
//         price: 19.90,
//         labels: ["getwell"],
//         image_location: "/images/cards/getwell4.jpg"
//     },
//     {
//         cardId: 25,
//         cardName: "Darth Vader Get Well Card",
//         price: 19.90,
//         labels: ["getwell"],
//         image_location: "/images/cards/getwell5.jpg"
//     },
//     //////
//     {
//         cardId: 26,
//         cardName: "General Graduation Card",
//         price: 49.90,
//         labels: ["greetings"],
//         image_location: "/images/cards/graduation.jpg"
//     },
//     {
//         cardId: 27,
//         cardName: "Go Sister Graduation Card",
//         price: 49.90,
//         labels: ["greetings"],
//         image_location: "/images/cards/graduation2.jpg"
//     },
//     {
//         cardId: 28,
//         cardName: "Mystery Graduation Card",
//         price: 49.90,
//         labels: ["greetings"],
//         image_location: "/images/cards/graduation3.jpg"
//     },
//     //////
//     {
//         cardId: 29,
//         cardName: "Emojis Greeting Card",
//         price: 39.90,
//         labels: ["greetings"],
//         image_location: "/images/cards/greetings.jpg"
//     },
//     //////
//     {
//         cardId: 30,
//         cardName: "Mothers Day Card",
//         price: 59.90,
//         labels: ["women", "family"],
//         image_location: "/images/cards/mum.jpg"
//     },
//     //////
//     {
//         cardId: 31,
//         cardName: "Champagne Wedding Card",
//         price: 79.90,
//         labels: ["men", "women", "family", "wedding",],
//         image_location: "/images/cards/wedding.jpg"
//     },
//     {
//         cardId: 32,
//         cardName: "Painting Wedding Card",
//         price: 79.90,
//         labels: ["men", "women", "family", "wedding",],
//         image_location: "/images/cards/wedding2.jpg"
//     },
//     {
//         cardId: 33,
//         cardName: "Mr & Mrs Wedding Card",
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