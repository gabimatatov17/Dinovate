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


////
// mongoose.connect('mongodb://localhost:27017/Dinovate')
//     .then(() => console.log('Connected to MongoDB!'))
//     .catch(err => console.error('Could not connect to MongoDB...', err));
//
// const cards = [
//     {
//         cardId: 1,
//         cardName: "birthday_card_1",
//         price: 19.90,
//         labels: ["birthdays", "men", "women", "family"]
//     },
//     {
//         cardId: 2,
//         cardName: "getwell_card_1",
//         price: 19.90,
//         labels: ["men", "women", "family"]
//         image_location:"/image/baby.jpg"
//         
//     }
// ];
// labels: ["baby", "birthday", "greetin"]

// Card.insertMany(cards)
//     .then(() => console.log('All cards saved successfully!'))
//     .catch(err => console.error('Error saving cards:', err.message))
//     .finally(() => mongoose.connection.close());