const Customer = require('../models/customers');
const Order = require('../models/orders');

// Show the user's profile page with their information and orders
async function showProfile(req, res) {
    try {
        // Fetch the logged-in user's details from the session
        const customer = await Customer.findOne({ id: req.session.customer.id });
        
        // Fetch the user's orders based on their customerId
        const orders = await Order.find({ customerId: customer.id });

        // Render the profile page and pass customer data and orders
        res.render('profile', { customer, orders });
    } catch (error) {
        console.error('Error fetching profile data:', error);
        res.status(500).send('Server error. Please try again later.');
    }
}

// Handle profile updates
async function updateProfile(req, res) {
    try {
        const { firstName, lastName, email, gender, birthDate } = req.body;

        // Update the user's information in the database
        await Customer.updateOne(
            { id: req.session.customer.id },
            { firstName, lastName, email, gender, birthDate }
        );

        // Fetch updated customer details
        const updatedCustomer = await Customer.findOne({ id: req.session.customer.id });

        // Update session with new customer data
        req.session.customer = updatedCustomer;

        // Redirect back to profile page after updating
        res.redirect('/profile');
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send('Error updating profile. Please try again.');
    }
}

module.exports = {
    showProfile,
    updateProfile
};
