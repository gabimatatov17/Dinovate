const path = require("path").resolve(__dirname, "..");
const productsService = require("../services/products");


async function showAdminView(req, res) {

    // extract data from session
    var sessionCostumer = req.session.customer;
    var isAuthenticated = sessionCostumer ? true : false;

    const items = await productsService.getAllProducts();
    console.log(items);
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

module.exports = {
    showAdminView
}