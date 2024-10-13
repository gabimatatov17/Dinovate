const axios = require('axios');
const Order = require('../models/orders'); // Import the Order model
const Store = require('../models/stores'); // Import the Store model
const AUTH_ID = process.env.AUTH_ID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;

// A function to increase the quantity of an item in the cart
async function addToCart(req, res) {
  const { cardId } = req.body;

  if (!req.session.cart) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }

  const cart = req.session.cart;
  const item = cart.find(item => item.cardId === cardId);

  if (item) {
    if (item.quantity >= 5) {
      return res.status(400).json({ success: false, message: "For large orders, please contact our support" });
    }

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
  const itemIndex = cart.findIndex(item => item.cardId === cardId);

  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);  // Remove the item from the cart
  }

  req.session.cart = cart;  // Update the cart in the session
  res.json({ success: true, cart });
}

// Generate a unique order ID 
async function generateOrderId() {
  const lastOrder = await Order.findOne().sort({ orderId: -1 });
  return lastOrder ? lastOrder.orderId + 1 : 1;
}

// Renders the shopping cart page
async function showCart(req, res) {
  let cart = req.session.cart || [];
  let total = 0;

  for (const item of cart) {
    total += item.price * item.quantity;
  }

  const sessionCustomer = req.session.customer;
  const isAuthenticated = sessionCustomer ? true : false;
  const isAdmin = sessionCustomer ? sessionCustomer.isAdmin : null;

  // Fetch store locations
  const stores = await Store.find({});

  res.render('cart', { cart, total, isAuthenticated, isAdmin, stores }); // Pass cart, total, and stores to the view
}

// Validate address using SmartyStreets API
async function validateAddress(req, res) {
  const { street, locality, postal_code, country = "ISR" } = req.body;

  const url = `https://international-street.api.smartystreets.com/verify?auth-id=${AUTH_ID}&auth-token=${AUTH_TOKEN}&address1=${encodeURIComponent(street)}&locality=${encodeURIComponent(locality)}&postal_code=${encodeURIComponent(postal_code)}&country=${encodeURIComponent(country)}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (response.status === 200 && data.length > 0) {
      const addressAnalysis = data[0].analysis;

      switch (addressAnalysis.verification_status) {
        case 'Verified':
        case 'Partial': {
          if (!req.session.customer || !req.session.cart) {
            return res.json({ valid: false, message: 'Cart or customer information is missing. Please try again.' });
          }

          const shippingAddress = `${street}, ${locality}, ${postal_code}, ${country}`;
          const newOrderId = await generateOrderId();

          const newOrder = new Order({
            orderId: newOrderId,
            customerId: req.session.customer._id,
            cards: req.session.cart.map(item => ({
              cardId: item.cardId,
              greeting: `Enjoy your ${item.cardName}!`
            })),
            totalPrice: req.session.cart.reduce((total, item) => total + (item.price * item.quantity), 0),
            shippingAdress: shippingAddress
          });

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
    res.status(500).json({ valid: false, message: 'Server error while validating the address. Please try again later.', error });
  }
}

// Handle Pickup Order
async function handlePickupOrder(req, res) {
  if (!req.session.customer || !req.session.cart) {
    return res.json({ success: false, message: 'Cart or customer information is missing.' });
  }

  const storeAddress = req.body.storeAddress;
  const customerId = req.session.customer._id;

  try {
    const newOrderId = await generateOrderId();

    const newOrder = new Order({
      orderId: newOrderId,
      customerId: customerId,
      cards: req.session.cart.map(item => ({
        cardId: item.cardId,
        greeting: `Enjoy your ${item.cardName}!`
      })),
      totalPrice: req.session.cart.reduce((total, item) => total + (item.price * item.quantity), 0),
      shippingAdress: `PICKUP - ${storeAddress}`
    });

    await newOrder.save();
    return res.json({ success: true, message: 'Pickup order placed!', order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error placing pickup order' });
  }
}

module.exports = {
  addToCart,
  removeFromCart,
  generateOrderId,
  showCart,
  validateAddress,
  handlePickupOrder
};
