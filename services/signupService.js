const Customer = require('../models/customers');

const getNextCustomerId = async () => {
    const latestCustomerId = await Customer.findOne().sort({ customerId: -1 }).exec();
    return latestCustomerId ? latestCustomerId.customerId + 1 : 1;
};

async function registerNewUser(firstName, lastName, email, gender, birthDate, password) {
    // Get the next customerId
    const nextCustomerId = await getNextCustomerId();

    // Create the new user
    const newUser = new Customer({
        customerId: nextCustomerId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
        birthDate: birthDate,
        password: password,
        orders: []
    });

    // Save the new user/customer
    await newUser.save();
}

module.exports = { registerNewUser };
