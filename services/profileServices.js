const Customer = require('../models/customers');
const Order = require('../models/orders');

// Fetch customer details
async function getCustomerById(customerId) {
    return await Customer.findOne({ _id: customerId });
}

// Fetch user orders by customerId
async function getOrdersByCustomerId(customerId) {
    return await Order.find({ customerId });
}

// Update customer details
async function updateCustomerProfile(customerId, updateFields) {
    return await Customer.updateOne({ _id: customerId }, { $set: updateFields });
}

// Delete a customer by ID
async function deleteCustomerById(customerId) {
    return await Customer.deleteOne({ _id: customerId });
}

// Delete all orders for a customer
async function deleteOrdersByCustomerId(customerId) {
    return await Order.deleteMany({ customerId });
}

module.exports = {
    getCustomerById,
    getOrdersByCustomerId,
    updateCustomerProfile,
    deleteCustomerById,
    deleteOrdersByCustomerId
};
