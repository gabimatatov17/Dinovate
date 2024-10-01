const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
const authenticationMiddleware = require('../middleware/authMiddleware');

// If a user is not authenticated, they will be redirected to the login page.
router.use(authenticationMiddleware.ensureAuthenticated);

router.get('/', cartController.showCart);  // This should call cartController.showCart

// Route to handle address validation
router.post('/validate-address', (req, res, next) => {
    console.log('POST /cart/validate-address route hit');  // Log when the route is hit
    next();  // Pass the request to the controller function
}, cartController.validateAddress);

// Route to handle adding an item to the cart
router.post('/add', cartController.addToCart);  // This route will call cartController.addToCart

// Route to handle removing an item from the cart
router.post('/remove', cartController.removeFromCart);  // This route will call cartController.removeFromCart

module.exports = router;
