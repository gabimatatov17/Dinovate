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

// routes
const home = require('./routes/home');
const admin = require('./routes/admin');
const cart = require('./routes/cart');
const login = require('./routes/login');
const logout = require('./routes/logout');
const signup = require('./routes/signup');
const stores = require('./routes/stores')
const profileRoute = require('./routes/profile');
const contact = require('./routes/contact');
const greetingRoutes = require('./routes/greeting-greeting'); 



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
app.use("/logout", logout);
app.use("/signup", signup);
app.use("/stores", stores);
app.use('/profile', profileRoute);
app.use('/admin', admin);
app.use('/contact', contact);
app.use('/greetings', greetingRoutes);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
