const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const { default: mongoose } = require('mongoose');

// routes
const home = require('./routes/home');
const cart = require('./routes/cart');
const login = require('./routes/login');
const signup = require('./routes/signup');


// Connecting to MongoDB instance
mongoose.connect("mongodb://localhost:27017/Dinovate")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


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


// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
