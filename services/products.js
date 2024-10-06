const Card = require('../models/products');


async function getAllProducts() {
    try {
        const products = await Card.find().exec(); 
        return products;
    } catch (error) {
        console.error('Error finding products: ', error);
        return null;
    }
}


async function removeProduct(productID) {

    const resp = await Card.deleteOne({cardId: productID}).then(result => {

        if (result.deletedCount == 0) {

            return Promise.reject({status: 500, message: "Product not found"});

        }
        return Promise.resolve({status: 200});

    }).catch(e => {

        return Promise.reject({status: 500, message: e});

    });

    return resp;

}


async function editProduct(productID, data) {

    try {

        const result = await Order.updateOne({ productId: productID }, data, { 
            runValidators: true
        });

        if (result.modifiedCount == 0) {

            return ({status: 500, message: "Product not found"});

        }

        return ({status: 200});

    } catch (e) {

        console.error('Error updating item:', error);
        return ({status: 500, message: e});

    }

}

module.exports = {
    getAllProducts,
    removeProduct,
    editProduct
}