const Order = require('../models/orders');


async function removeOrder(orderID) {
    const resp = await Order.deleteOne({ orderId: orderID }).then(result => {

        if (result.deletedCount == 0) {
            return Promise.reject({ status: 500, message: "Order not found" });
        }
        return Promise.resolve({ status: 200, message: "success"});

    }).catch(e => {
        return Promise.reject({ status: 500, message: e });
    });
    return resp;
}


async function editOrder(orderID, data) {
    try {
        const result = await Order.updateOne({ orderId: orderID }, data, {
            runValidators: true
        });
        if (result.modifiedCount == 0) {
            return ({ status: 500, message: "Order not found" });
        }
        return ({ status: 200, message: "Success"  });

    } catch (e) {
        console.error('Error updating item:', e);
        return ({ status: 500, message: e });
    }
}


async function getAllOrders() {

    try {

        const orders = await Order.find().exec();
        return orders;

    } catch (error) {

        console.error('Error finding orders: ', error);
        return null;

    }

}

async function getDailyOrderCount() {
    try {
        const dailyOrders = await Order.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$dateCreated" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        return (dailyOrders);
    } catch (err) {
        console.error(err);
        return null;
    }
};

module.exports = {
    removeOrder,
    editOrder,
    getAllOrders,
    getDailyOrderCount
};