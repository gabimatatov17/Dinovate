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

module.exports = {
    getAllProducts
}