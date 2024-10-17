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

async function getCustomers(admin) {
    try {
        const customers = await Customer.aggregate([
            {
                $match: {isAdmin: admin}
            },
            {
                $lookup: {
                    from: 'orders',
                    localField: '_id',
                    foreignField: 'customerId',
                    as: 'userOrders'
                }
            },
            {
                $project: {
                    email: 1,
                    id: '$_id',
                    amountOfOrders: { $size: '$userOrders' }
                }
            }
        ]);
        return {status: 200, message: customers};
    } catch (error) {
        console.error('Error finding customers by ', searchDict, error);
        return {status: 400, message: 'Error finding customers by ', searchDict, error};
    }

}

module.exports = {
    getCustomerByEmail,
    getCustomers
}