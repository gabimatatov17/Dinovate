const path = require("path").resolve(__dirname, "..");


async function showCatalog(req, res) {
    res.render("home", { 
      root: path,
      isAuthenticated: req.session.customer ? true : false
    });
  }

module.exports = {
    showCatalog
}