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
