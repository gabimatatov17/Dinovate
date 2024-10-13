const path = require("path").resolve(__dirname, "..");
const productsService = require("../services/products");
const storesService = require("../services/stores");
const ordersService = require("../services/orders");
const usersService = require("../services/customers");
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
        
                return res.render('productsPopup', combinedObj);

            }

            return res.render('productsPopup', renderObject);

        case "stores":

            return res.render('storesPopup');
    }
}


async function showAdminView(req, res) {

    // extract data from session
    var sessionCostumer = req.session.customer;
    var isAuthenticated = sessionCostumer ? true : false;

    const products = await productsService.getAllProducts();
    const stores = await storesService.getAllStores();
    const orders = await ordersService.getAllOrders();

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

    // parse orders
    let monthlyOrders = {};
    orders.forEach(order => {
        order.formattedDateAdded = moment(order.dateAdded).format('DD/MM/YYYY');
        const date = new Date(order.dateCreated);
        const month = date.toLocaleString('default', { month: 'long', year: 'numeric' });
        
        if (!monthlyOrders[month]) {
            monthlyOrders[month] = { totalOrders: 0, days: new Set() };
        }
        
        monthlyOrders[month].totalOrders++;
        monthlyOrders[month].days.add(date.getDate());
    });

    const ordersAverages = Object.keys(monthlyOrders).map(month => {
        const { totalOrders, days } = monthlyOrders[month];
        const averagePerDay = totalOrders / days.size;
        return { month, averagePerDay };
    });

    ordersAverages.sort((a, b) => new Date(a.month) - new Date(b.month));
    const dailyOrders = await ordersService.getDailyOrderCount();

    if (isAuthenticated) {
        var isAdmin = sessionCostumer.isAdmin;
        if (isAdmin) {
            res.render("admin", {
                root: path,
                isAuthenticated,
                products: result,
                isAdmin,
                stores,
                orders,
                ordersAverages,
                dailyOrders
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

                data = body;
                delete data.id;

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
            if (response.status == 200 && twitter_post === 'yes'){
                try {
                    const tweet = await twitterService.postProductToTwitter({ cardName, price, labels });
                    console.log("Tweet successful: ", tweet);
                } catch (e) {
                    console.error("Error posting to Twitter: ", e);
                }
            }
            return res.send(response);

        case "stores":

            // Process the received data
            const body = req.body;
            delete body.type;
            console.log('Received store data:', body);
            response = await storesService.createStore(body);
            // Ensure response status is correct, and twitter_post exists
            if (response.status == 200 && req.body.twitter_post === 'yes') {
                try {
                    const tweet = await twitterService.postStoreToTwitter({
                        storeName: body.storeName,
                        storeAddress: body.storeAdress,
                        phoneNumber: body.phoneNumber,
                        workingHours: body.workingHours
                    });
                    console.log("Tweet successful: ", tweet);
                } catch (e) {
                    console.error("Error posting to Twitter: ", e);
                }
            }
            return res.send(response);

        default:
            return res.status(404).send({ status: 404, message: "Type not supported" });
    }
}


async function getUsers(req, res) {

    const admin = req.params.admin;
    try {
        
        const searchDict = {
            isAdmin: admin
        }
        const response = await usersService.getCustomers(searchDict);
        return res.send(response);

    } catch (err) {

        return res.send({status: 500, message: err});

    }

}

module.exports = {
    showAdminView,
    deleteItem,
    createItem,
    getPopUp,
    editItem,
    getUsers
}