const path = require("path").resolve(__dirname, "..");
const productsService = require("../services/products");
const products = require('../models/products');
const axios = require("axios");


async function showCatalog(req, res) {

    try {

        let selectedLabels = req.query.labels ? (Array.isArray(req.query.labels) ? req.query.labels : [req.query.labels]) : [];
        selectedLabels = selectedLabels.map(label => decodeURIComponent(label));

        let query = {};
        let queryDescription = 'All items';

        if (selectedLabels.length > 0 && !selectedLabels.includes('All')) {
            query.labels = { $in: selectedLabels };
            queryDescription = `Items with labels: ${selectedLabels.join(', ')}`;
        }

        if(req.session.customer){
            var isAdmin = req.session.customer.isAdmin;
        } else {
            var isAdmin = null;
        }
        const filterdProducts = await products.find(query);
        const allLabels = await products.distinct('labels');

        const data = {
            root: path,
            isAuthenticated: req.session.customer ? true : false,
            isAdmin: isAdmin,
            allLabels: ['All', ...allLabels],
            selectedLabels,
            queryDescription,
            filterdProducts: filterdProducts
        };

        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            // If it's an AJAX request, send JSON
            res.json(data);
        } else {
            // If it's a regular request, render the page
            res.render('home', data);
        }

    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).send('An error occurred while fetching items');
    }
}


async function addToCart(req, res){
    try {
        const cardId = req.body;  // Extract cardId from JSON body

        // Initialize cart in session if it doesn't exist
        if (!req.session.cart) {
            req.session.cart = [];
        }

        // Add card to session cart (if it's not already there)
        const cart = req.session.cart;
        const existingItem = cart.find(item => item.cardId === cardId);

        if (existingItem) {
            existingItem.quantity += 1;  // Increment quantity if card is already in the cart
        } else {
            cardId['quantity'] = 1;
            cart.push(cardId);  // Add new card to the cart with quantity 1
        }

        req.session.cart = cart;  // Save updated cart in session

        // Send a JSON response back
        res.json({ message: 'Card added to cart', cart });  // Respond with a success message and updated cart
    } catch (error) {
        res.status(500).json({ error: 'Failed to add card to cart' });  // Handle any errors
    }

    console.log(req.session.cart)
}


module.exports = {
    showCatalog,
    addToCart
}