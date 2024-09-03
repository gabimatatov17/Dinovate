const path = require("path").resolve(__dirname, "..");


async function showCatalog(req, res) {
    res.render("home", { root: path });
  }

module.exports = {

    showCatalog

}