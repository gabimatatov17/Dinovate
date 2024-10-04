const path = require("path").resolve(__dirname, "..");
const productsService = require("../services/products");
const customersService = require("../services/customers");
const storesService = require("../services/stores");
const ordersService = require("../services/orders");

const { getStoresDetails } = require("../services/stores");


async function showAdminView(req, res) {

    // extract data from session
    var sessionCostumer = req.session.customer;
    var isAuthenticated = sessionCostumer ? true : false;

    const items = await productsService.getAllProducts();
    const chunkSize = 4;
    let result = [];

    for (let i = 0; i < items.length; i += chunkSize) {
        // Create a chunk of 4 items and push to result
        result.push(items.slice(i, i + chunkSize));
    }

    if (isAuthenticated) {

        var isAdmin = sessionCostumer.isAdmin;

        if (isAdmin) {

            res.render("admin", {

                root: path,
                isAuthenticated: isAuthenticated,
                items: result

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

    const type = req.params.type;
    const ID = req.params.id;
    let response = null;

    switch (type) {

        case 'products':

            response = await productsService.removeProduct(ID);
            res.send(response);

        case 'customers':

            response = await customersService.removeCustomer(ID);
            res.send(response);

        case 'orders':

            response = await ordersService.removeOrder(ID);
            res.send(response);

        case 'stores':

            response = await storesService.removeStore(ID);
            res.send(response);


    }
    

}

module.exports = {
    showAdminView,
    deleteItem
}