const profileServices = require('../services/profileServices');

// Show the user's profile page with their information and orders
async function showProfile(req, res) {
    try {
        // Fetch the logged-in user's details and their orders from services
        const customer = await profileServices.getCustomerById(req.session.customer._id);
        const orders = await profileServices.getOrdersByCustomerId(customer._id);

        const sessionCustomer = req.session.customer;
        const isAuthenticated = sessionCustomer ? true : false;
        const isAdmin = sessionCustomer?.isAdmin || false;

        // Render the profile page with customer data and orders
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
        await profileServices.updateCustomerProfile(req.session.customer._id, updateFields);

        // Fetch updated customer details and update session
        const updatedCustomer = await profileServices.getCustomerById(req.session.customer._id);
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

        // Remove the customer and their orders
        await profileServices.deleteCustomerById(customerId);
        await profileServices.deleteOrdersByCustomerId(customerId);

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
