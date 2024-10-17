const axios = require('axios');
const Order = require('../models/orders');
const Store = require('../models/stores'); 
const Customer = require('../models/customers'); 
const products = require('../models/products'); 
const customers = require('../services/customers');
const greetingService = require('../services/greetingService');

const AUTH_ID = process.env.AUTH_ID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;

// A function to increase the quantity of an item in the cart
async function addToCart(req, res) {
  let { cardId } = req.body;
  cardId = parseInt(cardId); // Ensure cardId is treated as an integer

  if (!req.session.cart) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }

  const cart = req.session.cart;
  const item = cart.find(item => item.cardId === cardId);

  if (item) {
    item.quantity += 1; 
  } else {
    const cardData = await products.findOne({ cardId }); 
    if (cardData) {
      cart.push({
        cardId: cardData.cardId,
        cardName: cardData.cardName,
        price: cardData.price,
        image: cardData.image_location,
        quantity: 1,
        greeting: ''
      });
    } else {
      return res.status(400).json({ success: false, message: "Item not found" });
    }
  }

  req.session.cart = cart;  
  console.log("Cart updated:", cart);
  
  // Return success response
  return res.json({ success: true, message: "Card added to cart", cart });
}


// A function to remove an item or decrease its quantity from the cart
async function removeFromCart(req, res) {
  const { cardId } = req.body;

  if (!req.session.cart) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
  }

  let cart = req.session.cart;
  const itemIndex = cart.findIndex(item => item.cardId === parseInt(cardId)); // Ensure cardId is treated as an integer

  if (itemIndex !== -1) {
    if (cart[itemIndex].quantity > 1) {
      // If quantity is more than 1, just decrease it
      cart[itemIndex].quantity -= 1;
    } else {
      // If quantity is 1, remove the item from the cart
      cart.splice(itemIndex, 1);
    }
    // Update the cart in the session
    req.session.cart = cart;  
    console.log("Cart updated:", cart);
    return res.json({ success: true, message: "Item updated in cart", cart });
  } else {
    return res.status(400).json({ success: false, message: "Item not found in cart" });
  }
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

// Function to validate cart items
async function validateCartItemsInDB(cart) {
  let unavailableItems = [];
  let validCart = [];

  // Loop through cart items and validate if they exist in the database
  for (let item of cart) {
    const productExists = await products.findOne({ cardId: item.cardId });

    if (!productExists) {
      unavailableItems.push(item); // Add unavailable item to the list
    } else {
      validCart.push(item); // If available, add to the valid cart list
    }
  }

  // Map unavailableItems to just their cardName for displaying in the message
  const unavailableCardNames = unavailableItems.map(item => item.cardName);

  return { validCart, unavailableItems: unavailableCardNames }; // Return the card names of unavailable items
}



// Validate address using SmartyStreets API
async function validateAddress(req, res) {
  const { street, locality, postal_code, country = "ISR" } = req.body;

  try {
      console.log('--- Start of validateAddress ---');
      console.log('Received request body:', req.body);

      // Check if cart exists and log its contents
      const cart = req.session.cart || [];
      console.log('Cart contents:', cart);

      if (!cart.length) {
          console.log('Cart is empty.');
          return res.json({ valid: false, message: 'Your cart is empty.' });
      }

      // Validate cart items and log the result
      console.log('Validating cart items in DB...');
      const { validCart, unavailableItems } = await validateCartItemsInDB(cart);
      console.log('Valid cart items:', validCart);
      console.log('Unavailable items:', unavailableItems);

      if (unavailableItems.length > 0) {
          console.log('Unavailable items found. Prompting customer.');
          return res.json({
              valid: false,
              message: `The following items are no longer available: ${unavailableItems.join(', ')}. Please remove them from your cart`
          });
      }

      // Address validation via SmartyStreets
      const url = `https://international-street.api.smartystreets.com/verify?auth-id=${AUTH_ID}&auth-token=${AUTH_TOKEN}&address1=${encodeURIComponent(street)}&locality=${encodeURIComponent(locality)}&postal_code=${encodeURIComponent(postal_code)}&country=${encodeURIComponent(country)}`;
      console.log('Sending request to SmartyStreets with URL:', url);
      
      const response = await axios.get(url);
      const data = response.data;

      console.log('SmartyStreets response status:', response.status);
      console.log('SmartyStreets response data:', data);

      if (response.status === 200 && data.length > 0) {
          const addressAnalysis = data[0].analysis;
          console.log('Address analysis:', addressAnalysis);

          switch (addressAnalysis.verification_status) {
              case 'Verified':
              case 'Partial': {
                  console.log('Address is verified/partial, processing order...');
                  
                  const shippingAddress = `${street}, ${locality}, ${postal_code}, ${country}`;
                  const newOrderId = await generateOrderId();

                  console.log('Generated new order ID:', newOrderId);

                  const newOrder = new Order({
                      orderId: newOrderId,
                      customerId: req.session.customer._id,
                      cards: validCart.map(item => ({
                          cardId: item.cardId,
                          greeting: `Enjoy your ${item.cardName}!`
                      })),
                      totalPrice: validCart.reduce((total, item) => total + (item.price * item.quantity), 0),
                      shippingAdress: shippingAddress
                  });

                  console.log('Saving new order:', newOrder);
                  await newOrder.save();
                  console.log('Order saved successfully.');

                  // Update user orders array
                  const customer = customers.getCustomerByEmail(req.session.customer.email);
                  if (customer) {
                    await Customer.updateOne(
                      { email: req.session.customer.email }, // Find the customer by email
                      { $push: { orders: newOrderId } } // Push the new order ID to the orders array
                    );
                  }

                  // Reset cart session to empty after successful order
                  req.session.cart = [];
                  
                  return res.json({ valid: true, message: 'Address is valid!', order: newOrder, address: data[0] });
              }
              case 'Ambiguous':
                  console.log('Address is ambiguous, prompting user for more details.');
                  return res.json({ valid: false, message: 'Multiple addresses found. Please provide more precise information.' });
              case 'None':
              default:
                  console.log('Address could not be validated.');
                  return res.json({ valid: false, message: 'Address could not be validated. Please reenter shipping address' });
          }
      } else {
          console.log('Address not found or invalid.');
          return res.json({ valid: false, message: 'Address not found or invalid.' });
      }
  } catch (error) {
      console.error("Error during address validation:", error);  // Log the entire error object
      return res.status(500).json({ valid: false, message: 'Server error while validating the address. Please try again later.', error });
  }
}


// Handle Pickup Order and check cart items
async function handlePickupOrder(req, res) {

  if (!req.session.customer || !req.session.cart) {
      return res.json({ success: false, message: 'Cart or customer information is missing.' });
  }

  const cart = req.session.cart;
  
  // Validate cart items and log the result
  console.log('Validating cart items in DB...');
  const { validCart, unavailableItems } = await validateCartItemsInDB(cart);
  console.log('Valid cart items:', validCart);
  console.log('Unavailable items:', unavailableItems);


  if (unavailableItems.length > 0) {
    console.log('Unavailable items found. Prompting customer.');
    return res.json({
        success: false,
        message: `The following items are no longer available: ${unavailableItems.join(', ')}. Please remove them from your cart`
    });
  }

  try {
    const storeAddress = req.body.storeAddress;
    const customerId = req.session.customer._id;

    const newOrderId = await generateOrderId();

    const newOrder = new Order({
      orderId: newOrderId,
      customerId: customerId,
      cards: cart.map(item => ({
        cardId: item.cardId,
        greeting: `Enjoy your ${item.cardName}!`
      })),
      totalPrice: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
      shippingAdress: `PICKUP - ${storeAddress}`
    });

    await newOrder.save();

    // Update user orders array
    const customer = await customers.getCustomerByEmail(req.session.customer.email);
    if (customer) {
      await Customer.updateOne(
        { email: req.session.customer.email }, 
        { $push: { orders: newOrderId } } 
      );
    }
    
    // Reset cart session to empty after successful order
    req.session.cart = [];
    
    return res.json({ success: true, message: 'Pickup order placed successfully!', order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error placing pickup order.' });
  }
}

// Function to clean the cart by removing unavailable items
async function cleanCart(req, res) {
  const unavailableItems = req.body.unavailableItems;

  if (req.session.cart) {
      // Remove unavailable items from the session cart
      req.session.cart = req.session.cart.filter(item => 
          !unavailableItems.some(unavailable => unavailable.cardId === item.cardId)
      );
  }

  res.json({ success: true, message: "Cart updated without unavailable items." });
}

async function generateGreeting (req, res) {
  const { date, name, event } = req.body;

  try {
      const greeting = await greetingService.generateGreeting(date, name, event);
      res.json({ greeting });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error generating the greeting' });
  }
};

async function saveGreeting(req, res) {
  const { cardId, greeting } = req.body;

  if (!req.session.cart) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
  }

  const cart = req.session.cart;
  const item = cart.find(item => item.cardId === parseInt(cardId)); // Find the item in the cart by cardId

  if (item) {
      // Save the greeting for the specific item
      item.greeting = greeting;

      // Update the session with the modified cart
      req.session.cart = cart;

      return res.json({ success: true, message: "Greeting saved to the cart item", cart });
  } else {
      return res.status(400).json({ success: false, message: "Item not found in cart" });
  }
}



module.exports = {
  addToCart,
  removeFromCart,
  generateOrderId,
  showCart,
  validateCartItemsInDB,
  validateAddress,
  handlePickupOrder,
  cleanCart,
  generateGreeting,
  saveGreeting
};
