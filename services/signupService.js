const Customer = require('../models/customers');

const getNextCustomerId = async () => {
    const latestCustomerId = await Customer.findOne().sort({ id: -1 }).exec();
    return latestCustomerId ? latestCustomerId.id + 1 : 1;
};

async function registerNewUser(firstName, lastName, email, gender, birthDate, password) {
    // Get the next customerId
    const nextCustomerId = await getNextCustomerId();

    // Create the new user
    const newUser = new Customer({
        id: nextCustomerId,
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

    // Return the newly created user
    return newUser;
}

module.exports = { registerNewUser };
