const path = require("path").resolve(__dirname, "..");
const productsService = require("../services/products");
const storesService = require("../services/stores");
const ordersService = require("../services/orders");
const twitterService = require("../services/twitter");
const { compile } = require("ejs");
const moment = require('moment');


async function getPopUp(req, res) {

    const type = req.params.type;

    switch (type) {
        case "products":
    
            const action = req.query.action;
            var renderObject = {
                action
            }

            if (action == "Edit") {        
                const cardName = req.query.cardName;
                const object = await productsService.getProduct(cardName);
                const combinedObj = Object.assign({}, renderObject, object._doc);
                console.log(combinedObj);
        
                return res.render('productsPopup', combinedObj);
            }
            return res.render('productsPopup', renderObject);
    }
}


async function showAdminView(req, res) {

    // extract data from session
    var sessionCostumer = req.session.customer;
    var isAuthenticated = sessionCostumer ? true : false;

    const products = await productsService.getAllProducts();
    const stores = await storesService.getAllStores();

    // parse products
    const chunkSize = 4;
    let result = [];

    for (let i = 0; i < products.length; i += chunkSize) {
        // Create a chunk of 4 items and push to result
        result.push(products.slice(i, i + chunkSize));
    }

    // parse stores
    stores.forEach(store => {
        store.formattedDateAdded = moment(store.dateAdded).format('DD/MM/YYYY');
    });

    if (isAuthenticated) {
        var isAdmin = sessionCostumer.isAdmin;
        if (isAdmin) {
            res.render("admin", {
                root: path,
                isAuthenticated,
                products: result,
                isAdmin,
                stores
            });
        }
        else {
            res.redirect('/');
        }
    }
    else {
        res.redirect('/login');
    }
}


async function deleteItem(req,res) {

    const ID = req.params.id;
    const type = req.params.type;
    let response = null;

    try {
        switch (type) {
            case 'products':

                response = await productsService.removeProduct(ID);
                return res.send(response);

            case 'orders':

                response = await ordersService.removeOrder(ID);
                return res.send(response);

            case 'stores':

                response = await storesService.removeStore(ID);
                return res.send(response);

            default:

                return res.status(404).send({ status: 404, message: "Type not supported" });
        }
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).send({ status: 500, message: "Internal Server Error" });
    }

}


async function editItem(req, res) {

    const type = req.params.type;
    const body = req.body;
    const ID = body.id;
    let data = null;
    let response = null;

    try {
        switch (type) {
            case 'products':

                data = body.data;
                response = await productsService.editProduct(ID, data);
                return res.send(response);

            case 'orders':

                response = await ordersService.editOrder(ID, data);
                return res.send(response);

            case 'stores':

                const storeName = body.storeName;
                const storeAddress = body.storeAddress;
                const phoneNumber = body.phoneNumber;
                const workingHours = body.workingHours;
                const imageLocation = body.imageLocation;

                data = {
                    storeName,
                    storeAddress,
                    phoneNumber,
                    workingHours,
                    imageLocation
                }

                response = await storesService.editStore(ID, data);
                return res.send(response);

            default:

                return res.status(404).send({ status: 404, message: "Type not supported" });
        }
    } catch (error) {
        console.error("Error editing item:", error);
        res.status(500).send({ status: 500, message: "Internal Server Error" });
    }

}


async function createItem(req, res) {

    const type = req.body.type;
    let response = null;

    switch (type) {

        case "products":
            
            // unpack the item
            const { cardName, price, labels, image_location, twitter_post } = req.body;
            
            // Process the received data
            console.log('Received product data:', {
                cardName,
                price,
                labels,
                image_location,
                twitter_post
            });

            response = await productsService.createProduct(cardName, price, labels, image_location);
            if (twitter_post === 'yes'){
                const tweet = await twitterService.postToTwitter({ cardName, price, labels })
                console.log("Tweet successful: ", tweet);
            }
            return res.send(response);

        case "stores":

            // Process the received data
            console.log('Received store data:', req.body);
            response = await storesService.createStore(req.body);
            return res.send(response);

        default:
            return res.status(404).send({ status: 404, message: "Type not supported" });
    }
}

module.exports = {
    showAdminView,
    deleteItem,
    createItem,
    getPopUp,
    editItem
}