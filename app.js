const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const { default: mongoose } = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, 'configuration', '.env') });  // Load environment variables first

const app = express();

// simulation for cart session
const Card = require('./models/products');  // Adjust the path if necessary
const Customer = require('./models/customers');  // Your Customer model

// routes
const home = require('./routes/home');
const cart = require('./routes/cart');
const login = require('./routes/login');
const signup = require('./routes/signup');
const stores = require('./routes/stores')
const profileRoute = require('./routes/profile');



// Connecting to MongoDB instance
mongoose.connect("mongodb://localhost:27017/Dinovate")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


// Session initialization
app.use(session({
    secret: process.env.SESSION_SECRET,  // Load the secret from environment variable
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set to true if using HTTPS
}));

// !!delete this bit before pulling from main
// Simulate session cart data and customer by fetching from MongoDB 
app.use(async (req, res, next) => {
    // Simulate cart data
    if (!req.session.cart) {
        try {
            // Fetch two random cards from the database
            const cards = await Card.aggregate([{ $sample: { size: 2 } }]);

            if (cards.length >= 2) {
                req.session.cart = cards.map(card => ({
                    cardId: card.cardId,
                    cardName: card.cardName,
                    price: card.price,
                    quantity: 1,  // Default quantity
                    image: card.image_location
                }));
                console.log('Simulated cart data added to session');
            } else {
                console.log('Not enough cards in the database to simulate the cart');
            }
        } catch (error) {
            console.error('Error fetching cards from MongoDB:', error.message);
        }
    }

    // Simulate customer data
    if (!req.session.customer) {
        try {
            // Fetch one random customer from the database
            const customer = await Customer.aggregate([{ $sample: { size: 1 } }]);

            if (customer.length > 0) {
                req.session.customer = customer[0];  // Store the entire customer object in session
                console.log('Simulated customer data added to session');
            } else {
                console.log('No customers found in the database');
            }
        } catch (error) {
            console.error('Error fetching customer from MongoDB:', error.message);
        }
    }

    next();
});



// express settings
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


// routes
app.use("/", home);
app.use("/cart", cart);
app.use("/login", login);
app.use("/signup", signup)
app.use("/stores", stores)
app.use('/profile', profileRoute);


// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
