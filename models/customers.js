const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Email address is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Regular expression to validate email format
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    gender: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    orders: {
        type: Array     // Array of orderId's or Order Schema
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    },
});

const Customer = mongoose.model("Customer", customerSchema, "customers");
module.exports = Customer;




///////
// mongoose.connect('mongodb://localhost:27017/Dinovate')
//     .then(() => console.log('Connected to MongoDB!'))
//     .catch(err => console.error('Could not connect to MongoDB...', err));

// const customers = [
//     {
//         id: 1,
//         firstName: 'Gabi',
//         lastName: 'Matatov',
//         email: ' gabi.matatov@dinovate.com ',
//         gender: 'Male',
//         birthDate: new Date('2000-01-01'),
//         password: 'password123',
//         isAdmin: true
//     },
//     {
//         id: 2,
//         firstName: 'Din',
//         lastName: 'Nehmadi',
//         email: ' Din.Nehmadi@dinovate.com ',
//         gender: 'Male',
//         birthDate: new Date('2000-01-01'),
//         password: 'password123',
//         isAdmin: true
//     },
//     {
//         id: 3,
//         firstName: 'Noam',
//         lastName: 'Globerman',
//         email: ' Noam.Globerman@dinovate.com ',
//         gender: 'Male',
//         birthDate: new Date('2000-01-01'),
//         password: 'password123',
//         isAdmin: true
//     },
//     {
//         id: 4,
//         firstName: 'Mia',
//         lastName: 'Wolfson',
//         email: ' Mia.Wolfson@dinovate.com ',
//         gender: 'Female',
//         birthDate: new Date('2000-01-01'),
//         password: 'password123',
//         isAdmin: true
//     },
//     {
//         id: 5,
//         firstName: 'Yonatan',
//         lastName: 'Sini',
//         email: ' Yonatan.Sini@dinovate.com ',
//         gender: 'Male',
//         birthDate: new Date('2000-01-01'),
//         password: 'password123',
//         isAdmin: true
//     },
//     {
//         id: 6,
//         firstName: 'David',
//         lastName: 'Beckham',
//         email: ' David.Beckham@dinovate.com ',
//         gender: 'Male',
//         birthDate: new Date('2000-01-01'),
//         password: 'password123',
//         orders : [1]
//     },
//     {
//         id: 7,
//         firstName: 'Phil',
//         lastName: 'Foden',
//         email: ' Phil.Foden@dinovate.com ',
//         gender: 'Male',
//         birthDate: new Date('2000-01-01'),
//         password: 'password123',
//         orders : [2,3]
//     }
// ];

// Customer.insertMany(customers)
//     .then(() => console.log('All customers saved successfully!'))
//     .catch(err => console.error('Error saving customers:', err.message))
//     .finally(() => mongoose.connection.close());