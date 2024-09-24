const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    storeId: {
        type: Number,
        required: true,
        unique: true
    },
    storeName: {
        type: String,
        required: true
    },
    storeAdress: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                // Basic phone number validation regex
                return /\+?[0-9\s()-]{7,}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    workingHours: {
        type: String,
        required: true,
    },
    imageLocation: {
        type: String,
        required: true,
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

const Store = mongoose.model("Store", storeSchema, "stores");
module.exports = Store;


// mongoose.connect('mongodb://localhost:27017/Dinovate')
//     .then(() => console.log('Connected to MongoDB!'))
//     .catch(err => console.error('Could not connect to MongoDB...', err));

// const stores = [
//     {
//         storeId: 1,
//         storeName: "Dinovate TLV Towers, Tel Aviv",
//         storeAdress: "Graziani Yizhak 4, Tel Aviv",
//         phoneNumber: '03-4046-502',
//         workingHours: '09:00 - 20:00',
//         imageLocation: '/images/stores/store1.jpg'
//     },
//     {
//         storeId: 2,
//         storeName: "Dinovate Rothschild, Tel Aviv",
//         storeAdress: "Rothschild Boulevard 130, Tel Aviv", 
//         phoneNumber: '08-9226-503',
//         workingHours: '09:00 - 20:00',
//         imageLocation: '/images/stores/store2.jpg'
//     },
//     {
//         storeId: 3,
//         storeName: "Dinovate Kiryat Krinitsi, Ramat Gan",
//         storeAdress: "Kiryat Krinitsi 20, Ramat Gan", 
//         phoneNumber: '03-4226-518',
//         workingHours: '09:00 - 20:00',
//         imageLocation: '/images/stores/store3.jpg'
//     },
//     {
//         storeId: 4,
//         storeName: "Dinovate Hadar Ganim, Petah Tikva",
//         storeAdress: "Hadar Ganim, Petah Tikva", 
//         phoneNumber: '08-6713-990',
//         workingHours: '09:00 - 20:00',
//         imageLocation: '/images/stores/store4.jpg'
//     }
// ];

// Store.insertMany(stores)
//      .then(() => console.log('All stores saved successfully!'))
//      .catch(err => console.error('Error saving stores:', err.message))
//      .finally(() => mongoose.connection.close());