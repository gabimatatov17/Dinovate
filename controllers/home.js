const path = require("path").resolve(__dirname, "..");
const productsService = require("../services/products");


async function showCatalog(req, res) {

    const items = await productsService.getAllProducts();

    res.render("home", { 
        root: path,
        isAuthenticated: req.session.customer ? true : false,
        items: items
    });
  }

module.exports = {
    showCatalog
}