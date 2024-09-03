const path = require("path").resolve(__dirname, "..");


async function showCart(req, res) {
    res.render("cart", { root: path });
  }

module.exports = {

    showCart

}