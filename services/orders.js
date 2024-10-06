const Order = require('../models/orders'); 


async function removeOrder(orderID) {

    const resp = await Order.deleteOne({orderId: orderID}).then(result => {

        if (result.deletedCount == 0) {

            return Promise.reject({status: 500, message: "Order not found"});

        }
        return Promise.resolve({status: 200});

    }).catch(e => {

        return Promise.reject({status: 500, message: e});

    });

    return resp;

}


async function editOrder(orderID, data) {

    try {

        const result = await Order.updateOne({ orderId: orderID }, data, { 
            runValidators: true
        });

        if (result.modifiedCount == 0) {

            return ({status: 500, message: "Order not found"});

        }

        return ({status: 200});

    } catch (e) {

        console.error('Error updating item:', error);
        return ({status: 500, message: e});

    }

}

module.exports = {
    removeOrder,
    editOrder
};