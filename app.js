const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// routes
const home = require('./routes/home');
const cart = require('./routes/cart');

// express settings
app.set('views', path.join(__dirname, 'views'));   
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/", home);
app.use("/cart", cart)

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});