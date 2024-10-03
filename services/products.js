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

module.exports = {
    getAllProducts,
    removeProduct
}