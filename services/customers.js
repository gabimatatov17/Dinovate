const Customer = require('../models/customers'); 

async function getCustomerByEmail(email) {
    try {
        const customer = await Customer.findOne({ email: email }).exec(); 
        return customer;
    } catch (error) {
        console.error('Error finding customer by email:', error);
        return null;
    }
}

module.exports = {
    getCustomerByEmail
}