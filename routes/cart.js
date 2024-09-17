const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");

router.get('/', cartController.showCart);  // This should call cartController.showCart


// Route to handle address validation
router.post('/validate-address', (req, res, next) => {
    console.log('POST /cart/validate-address route hit');  // Log when the route is hit
    next();  // Pass the request to the controller function
}, cartController.validateAddress);

module.exports = router;
