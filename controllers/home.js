const path = require("path").resolve(__dirname, "..");
const productsService = require("../services/products");


async function showCatalog(req, res) {

    const items = await productsService.getAllProducts();
    if(req.session.customer){
        var isAdmin = req.session.customer.isAdmin;
    } else {
        var isAdmin = null;
    }

    res.render("home", { 
        root: path,
        isAuthenticated: req.session.customer ? true : false,
        isAdmin, isAdmin,
        items: items
    });
  }

module.exports = {
    showCatalog
}