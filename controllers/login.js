const path = require("path").resolve(__dirname, "..");
const adminsService = require("../services/admins");
const customersService = require("../services/customers");


async function showLoginPage(req, res) {
  res.render("login", {
    root: path,
    error: null
  });
}


async function authenticateUser(req, res) {
  console.log(req.body); // Check for incoming data
  const { email, password, admin } = req.body;
  try {
    if (admin) {
      let adminUser = await adminsService.getAdminByEmail(email)
      if (adminUser) {
        if (password === adminUser.password) {
          console.log("Admin Authenticated")
          res.redirect('/'); // redirect to home
        } else {
          res.render('login', { root: path, error: "Invalid Admin Password" });
        }
      } else {
        res.render('login', { root: path, error: "No Admin Found" });
      }
    }
    else {
      let customerUser = await customersService.getCustomerByEmail(email)
      if (customerUser) {
        if (password === customerUser.password) {
          console.log("Customer Authenticated")
          res.redirect('/'); // redirect to home
        } else {
          res.render('login', { root: path, error: "Invalid Customer Password" });
        }
      } else {
        res.render('login', { root: path, error: "No Customer Found" });
      }
    }

  } catch (error) {
    console.error('Error autenticate user:', error);
    res.status(500).send('Server error')
  }
}


module.exports = {
  showLoginPage,
  authenticateUser
}