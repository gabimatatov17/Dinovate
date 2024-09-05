const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminId: {
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
    }
});

const Admin = mongoose.model("Admin", adminSchema, "admins");
module.exports = Admin;




/////
// mongoose.connect('mongodb://localhost:27017/Dinovate')
//     .then(() => console.log('Connected to MongoDB!'))
//     .catch(err => console.error('Could not connect to MongoDB...', err));

// const admins = [
//     {
//         adminId: 1,
//         firstName: 'Gabi',
//         lastName: 'Matatov',
//         email: ' gabi.mataov@example.com ',
//         gender: 'Male',
//         birthDate: new Date('2000-01-01'),
//         password: 'password123'
//     },
//     {
//         adminId: 2,
//         firstName: 'Din',
//         lastName: 'Nehmadi',
//         email: ' Din.Nehmadi@example.com ',
//         gender: 'Male',
//         birthDate: new Date('2000-01-01'),
//         password: 'password123'
//     },
//     {
//         adminId: 3,
//         firstName: 'Noam',
//         lastName: 'Globerman',
//         email: ' Noam.Globerman@example.com ',
//         gender: 'Male',
//         birthDate: new Date('2000-01-01'),
//         password: 'password123'
//     },
//     {
//         adminId: 4,
//         firstName: 'Mia',
//         lastName: 'Wolfson',
//         email: ' Mia.Wolfson@example.com ',
//         gender: 'Female',
//         birthDate: new Date('2000-01-01'),
//         password: 'password123'
//     },
//     {
//         adminId: 5,
//         firstName: 'Yonatan',
//         lastName: 'Sini',
//         email: ' Yonatan.Sini@example.com ',
//         gender: 'Male',
//         birthDate: new Date('2000-01-01'),
//         password: 'password123'
//     }
// ];

// Admin.insertMany(admins)
//   .then(() => console.log('All admins saved successfully!'))
//   .catch(err => console.error('Error saving admins:', err.message))
//   .finally(() => mongoose.connection.close());