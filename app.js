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
const cart = require('./routes/cart');
const login = require('./routes/login');
const signup = require('./routes/signup');
const stores = require('./routes/stores')


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


// Simulate session cart data by fetching two random cards from MongoDB
//app.use(async (req, res, next) => {
    //if (!req.session.cart) {
  //      try {
            // Fetch two random cards from the database
      //      const cards = await Card.aggregate([{ $sample: { size: 2 } }]);

            // If there are two cards in the database, simulate adding them to the cart
        //    if (cards.length >= 2) {
          //      req.session.cart = cards.map(card => ({
            //        cardId: card.cardId,
              //      cardName: card.cardName,
                //    price: card.price,
                  //  quantity: 1,  // Set default quantity to 1 for each item
                    //image: card.image_location  // Include the image path for display
                //}));
               // console.log('Simulated cart data added to session');
           // } else {
             //   console.log('Not enough cards in the database to simulate the cart');
            //}
        //} catch (error) {
          //  console.error('Error fetching cards from MongoDB:', error.message);
        //}
   // }
    //next();
//});


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

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

