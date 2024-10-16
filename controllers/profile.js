const mongoose = require('mongoose'); // Import mongoose
const Customer = require('../models/customers');
const Order = require('../models/orders');

// Show the user's profile page with their information and orders
async function showProfile(req, res) {
    try {
        // Fetch the logged-in user's details from the session
        const customer = await Customer.findOne({ _id: req.session.customer._id });

        // Fetch the user's orders based on their customerId
        const orders = await Order.find({ customerId: customer._id });

        // Check session details
        const sessionCustomer = req.session.customer;
        const isAuthenticated = sessionCustomer ? true : false;
        const isAdmin = sessionCustomer?.isAdmin || false;

        // Render the profile page and pass customer data and orders
        res.render('profile', { customer, orders, isAuthenticated, isAdmin });
    } catch (error) {
        console.error('Error fetching profile data:', error);
        res.status(500).send('Server error. Please try again later.');
    }
}

// Handle profile updates
async function updateProfile(req, res) {
    try {
        const { firstName, lastName, email, gender, birthDate, password } = req.body;
    
        // Create the update object
        let updateFields = { firstName, lastName, email, gender, birthDate };
    
        // If password exists and is not empty, include it in the update
        if (password) {
            updateFields.password = password;
        }
    
        // Update the user's information in the database
        await Customer.updateOne(
            { _id: req.session.customer._id },
            { $set: updateFields }
        );

        // Fetch updated customer details
        const updatedCustomer = await Customer.findOne({ _id: req.session.customer._id });

        // Update session with new customer data
        req.session.customer = updatedCustomer;

        // Redirect back to profile page after updating
        res.redirect('/profile');
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send('Error updating profile. Please try again.');
    }
}

// Delete user from the database
async function deleteUser(req, res) {
    try {
        const customerId = req.session.customer._id;

        // Remove the customer from the database
        await Customer.deleteOne({ _id: customerId });


        // Delete user orders 

        // Clear session
        req.session.destroy();

        // Send success response
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
}

module.exports = {
    showProfile,
    updateProfile,
    deleteUser
};
