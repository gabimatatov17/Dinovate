const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerId: {
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
    }
});

const Customer = mongoose.model("Customer", customerSchema, "customers");
module.exports = Customer;




///////
// mongoose.connect('mongodb://localhost:27017/Dinovate')
//     .then(() => console.log('Connected to MongoDB!'))
//     .catch(err => console.error('Could not connect to MongoDB...', err));

// const customers = [
//     {
//         customerId: 1,
//         firstName: 'David',
//         lastName: 'Beckham',
//         email: ' David.Beckham@example.com ',
//         gender: 'Male',
//         birthDate: new Date('2000-01-01'),
//         password: 'password123',
//         orders : [1]
//     },
//     {
//         customerId: 2,
//         firstName: 'Phil',
//         lastName: 'Foden',
//         email: ' Phil.Foden@example.com ',
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