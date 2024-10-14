const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
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
//         email: 'gabi.matatov@dinovate.com',
//         gender: 'Male',
//         birthDate: new Date('2000-11-20'),
//         password: 'password123',
//         isAdmin: true
//     },
//     {
//         id: 2,
//         firstName: 'Din',
//         lastName: 'Nehmadi',
//         email: 'Din.Nehmadi@dinovate.com',
//         gender: 'Male',
//         birthDate: new Date('2000-01-01'),
//         password: 'password123',
//         isAdmin: true
//     },
//     {
//         id: 3,
//         firstName: 'Noam',
//         lastName: 'Globerman',
//         email: 'Noam.Globerman@dinovate.com',
//         gender: 'Male',
//         birthDate: new Date('2000-08-14'),
//         password: 'password123',
//         isAdmin: true
//     },
//     {
//         id: 4,
//         firstName: 'Mia',
//         lastName: 'Wolfson',
//         email: 'Mia.Wolfson@dinovate.com',
//         gender: 'Female',
//         birthDate: new Date('2000-01-01'),
//         password: 'password123',
//         isAdmin: true
//     },
//     {
//         id: 5,
//         firstName: 'Yonatan',
//         lastName: 'Sini',
//         email: 'Yonatan.Sini@dinovate.com',
//         gender: 'Male',
//         birthDate: new Date('2000-10-24'),
//         password: 'password123',
//         isAdmin: true
//     },
//     {
//         id: 6,
//         firstName: 'David',
//         lastName: 'Beckham',
//         email: 'David.Beckham@dinovate.com',
//         gender: 'Male',
//         birthDate: new Date('1975-05-02'),
//         password: 'password123',
//         orders: [1]
//     },
//     {
//         id: 7,
//         firstName: 'Phil',
//         lastName: 'Foden',
//         email: 'Phil.Foden@dinovate.com',
//         gender: 'Male',
//         birthDate: new Date('2000-05-28'),
//         password: 'password123',
//         orders: [2, 3]
//     },
//     {
//         id: 8,
//         firstName: 'Lionel',
//         lastName: 'Messi',
//         email: 'lionel.messi@example.com',
//         gender: 'Male',
//         birthDate: new Date('1987-06-24'),
//         password: 'password123',
//         isAdmin: false,
//         orders: []
//     },
//     {
//         id: 9,
//         firstName: 'Serena',
//         lastName: 'Williams',
//         email: 'serena.williams@example.com',
//         gender: 'Female',
//         birthDate: new Date('1981-09-26'),
//         password: 'password123',
//         isAdmin: false,
//         orders: []
//     },
//     {
//         id: 10,
//         firstName: 'LeBron',
//         lastName: 'James',
//         email: 'lebron.james@example.com',
//         gender: 'Male',
//         birthDate: new Date('1984-12-30'),
//         password: 'password123',
//         isAdmin: false,
//         orders: []
//     },
//     {
//         id: 11,
//         firstName: 'Adele',
//         lastName: 'Adkins',
//         email: 'adele.adkins@example.com',
//         gender: 'Female',
//         birthDate: new Date('1988-05-05'),
//         password: 'password123',
//         isAdmin: false,
//         orders: []
//     },
//     {
//         id: 12,
//         firstName: 'Elon',
//         lastName: 'Musk',
//         email: 'elon.musk@example.com',
//         gender: 'Male',
//         birthDate: new Date('1971-06-28'),
//         password: 'password123',
//         isAdmin: false,
//         orders: []
//     },
//     {
//         id: 13,
//         firstName: 'Rihanna',
//         lastName: 'Fenty',
//         email: 'rihanna.fenty@example.com',
//         gender: 'Female',
//         birthDate: new Date('1988-02-20'),
//         password: 'password123',
//         isAdmin: false,
//         orders: []
//     },
//     {
//         id: 14,
//         firstName: 'Tom',
//         lastName: 'Holland',
//         email: 'tom.holland@example.com',
//         gender: 'Male',
//         birthDate: new Date('1996-06-01'),
//         password: 'password123',
//         isAdmin: false,
//         orders: []
//     },
//     {
//         id: 15,
//         firstName: 'Cristiano',
//         lastName: 'Ronaldo',
//         email: 'cristiano.ronaldo@example.com',
//         gender: 'Male',
//         birthDate: new Date('1985-02-05'),
//         password: 'password123',
//         isAdmin: false,
//         orders: []
//     },
//     {
//         id: 16,
//         firstName: 'Kylian',
//         lastName: 'Mbappé',
//         email: 'kylian.mbappe@example.com',
//         gender: 'Male',
//         birthDate: new Date('1998-12-20'),
//         password: 'password123',
//         isAdmin: false,
//         orders: []
//     },
//     {
//         id: 17,
//         firstName: 'Kevin',
//         lastName: 'De Bruyne',
//         email: 'kevin.debruyne@example.com',
//         gender: 'Male',
//         birthDate: new Date('1991-06-28'),
//         password: 'password123',
//         isAdmin: false,
//         orders: []
//     },
//     {
//         id: 18,
//         firstName: 'Erling',
//         lastName: 'Haaland',
//         email: 'erling.haaland@example.com',
//         gender: 'Male',
//         birthDate: new Date('2000-07-21'),
//         password: 'password123',
//         isAdmin: false,
//         orders: []
//     },
//     // Famous NBA players
//     {
//         id: 19,
//         firstName: 'Stephen',
//         lastName: 'Curry',
//         email: 'stephen.curry@example.com',
//         gender: 'Male',
//         birthDate: new Date('1988-03-14'),
//         password: 'password123',
//         isAdmin: false,
//         orders: []
//     },
//     {
//         id: 20,
//         firstName: 'Giannis',
//         lastName: 'Antetokounmpo',
//         email: 'giannis.antetokounmpo@example.com',
//         gender: 'Male',
//         birthDate: new Date('1994-12-06'),
//         password: 'password123',
//         isAdmin: false,
//         orders: []
//     }
// ];


// Customer.insertMany(customers)
//     .then(() => console.log('All customers saved successfully!'))
//     .catch(err => console.error('Error saving customers:', err.message))
//     .finally(() => mongoose.connection.close());