const path = require("path").resolve(__dirname, "..");

async function showContactPage(req, res) {

    if(req.session.customer){
        var isAdmin = req.session.customer.isAdmin;
    } else {
        var isAdmin = null;
    }

    res.render("contact", { 
        root: path,
        isAuthenticated: req.session.customer ? true : false,
        isAdmin, isAdmin
    });
  }

module.exports = {
    showContactPage
}