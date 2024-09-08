const Customer = require('../models/customers');  // Fix to Customer, not User

async function getCustomerByEmail(email) {
    try {
        const customer = await Customer.findOne({ email: email }).exec();  // Use Customer
        return customer ? true : false;
    } catch (error) {
        console.error('Error finding customer by email:', error);
        return null;
    }
}

module.exports = {
    getCustomerByEmail
}