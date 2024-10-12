// controllers/cart.js
const axios = require('axios');
const Order = require('../models/orders'); // Import the Order model
const Customer = require('../models/customers');  // Import Customer model
const Card = require('../models/products'); // Import Card model 

const AUTH_ID = process.env.AUTH_ID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;

// A function to increase the quantity of an item in the cart
async function addToCart(req, res) {
  const { cardId } = req.body;

  // Check if the cart exists in the session
  if (!req.session.cart) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }

  const cart = req.session.cart;

  // Find the item in the cart
  const item = cart.find(item => item.cardId === cardId);

  if (item) {
    // Check if the quantity exceeds 5
    if (item.quantity >= 5) {
      return res.status(400).json({ success: false, message: "For large orders, please contact our support" });
    }

    // Increase the quantity by 1
    item.quantity += 1;
  }

  req.session.cart = cart;  // Update the cart in the session
  res.json({ success: true, cart });
}

// A function to remove an item from the cart
async function removeFromCart(req, res) {
  const { cardId } = req.body;

  if (!req.session.cart) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }

  let cart = req.session.cart;

  // Find the index of the item
  const itemIndex = cart.findIndex(item => item.cardId === cardId);

  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);  // Remove the item from the cart
  }

  req.session.cart = cart;  // Update the cart in the session
  res.json({ success: true, cart });
}


// Generates a unique order ID 
async function generateOrderId() {
  const lastOrder = await Order.findOne().sort({ orderId: -1 });  // Get the last order
  return lastOrder ? lastOrder.orderId + 1 : 1;  // Increment orderId or start from 1
}

// Renders the shopping cart page
async function showCart(req, res) {
  let cart = req.session.cart || [];
  let total = 0;

  // Calculate total price for the cart
  for (const item of cart) {
    total += item.price * item.quantity;
  }

  // extract data from session
  var sessionCustumer = req.session.customer;
  var isAuthenticated = sessionCustumer ? true : false;

  if (sessionCustumer) {
    var isAdmin = sessionCustumer.isAdmin;
  } else {
    var isAdmin = null;
  }

  res.render("cart", { cart, total, isAuthenticated, isAdmin }); // Pass cart and total price to the view
}


// Validates the address using SmartyStreets International API
async function validateAddress(req, res) {
  const { street, locality, postal_code, country = "ISR" } = req.body;

  // API URL for international address validation
  const url = `https://international-street.api.smartystreets.com/verify?auth-id=${AUTH_ID}&auth-token=${AUTH_TOKEN}&address1=${encodeURIComponent(street)}&locality=${encodeURIComponent(locality)}&postal_code=${encodeURIComponent(postal_code)}&country=${encodeURIComponent(country)}`;

  try {
    console.log('Sending GET request to SmartyStreets:', url);  // Log the full URL

    const response = await axios.get(url);
    const data = response.data;

    console.log('SmartyStreets API response status:', response.status);  // Log the response status
    console.log('SmartyStreets API response data:', data);  // Log the API response data

    if (response.status === 200 && data.length > 0) {
      const addressAnalysis = data[0].analysis;
      console.log('data[0].analysis=', data[0].analysis, 'length:', data.length);
      console.log('addressAnalysis.verification_status-', addressAnalysis.verification_status);

      // Check the verification status
      switch (addressAnalysis.verification_status) {
        case 'Verified':
        case 'Partial': {
          // Address is valid, now create an order
          if (!req.session.customer || !req.session.cart) {
            console.log('cart or customer info missing');
            return res.json({ valid: false, message: 'Cart or customer information is missing. Please try again.' });
          }

          const shippingAddress = `${street}, ${locality}, ${postal_code}, ${country}`;

          // Generate new orderId
          const newOrderId = await generateOrderId();

          // Create a new order object
          const newOrder = new Order({
            orderId: newOrderId,
            customerId: req.session.customer._id,  // Correct the variable
            cards: req.session.cart.map(item => ({
              cardId: item.cardId,
              greeting: `Enjoy your ${item.cardName}!`  // Or ask the user for the greeting message
            })),
            totalPrice: req.session.cart.reduce((total, item) => total + (item.price * item.quantity), 0),
            shippingAdress: shippingAddress
          });

          // Save the order to the database
          await newOrder.save();
          return res.json({ valid: true, message: 'Address is valid!', order: newOrder, address: data[0] });
        }
        case 'Ambiguous':
          return res.json({ valid: false, message: 'Multiple addresses found. Please provide more precise information.' });
        case 'None':
        default:
          return res.json({ valid: false, message: 'Address could not be validated. Please reenter shipping address' });
      }
    } else {
      return res.json({ valid: false, message: 'Address not found or invalid.' });
    }
  } catch (error) {
    console.error('Error during address validation:', error);  // Log any unexpected errors
    res.status(500).json({ valid: false, message: 'Server error while validating the address. Please try again later.', error });
  }
}


module.exports = {
  addToCart,
  removeFromCart,
  generateOrderId,
  showCart,
  validateAddress
};