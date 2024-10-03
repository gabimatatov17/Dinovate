const path = require("path").resolve(__dirname, "..");


async function showAdminView(req, res) {

    // extract data from session
    var sessionCostumer = req.session.customer;
    var isAuthenticated = sessionCostumer ? true : false;

    if (isAuthenticated) {

        var isAdmin = sessionCostumer.isAdmin;

        if (isAdmin) {

            res.render("admin", {

                root: path,
                isAuthenticated: isAuthenticated

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