const path = require("path").resolve(__dirname, "..");
const customersService = require("../services/customers");
const sessionManagerService = require("../services/sessionsManager");


async function showLoginPage(req, res) {
  res.render("login", {
    root: path,
    error: null
  });
}


async function authenticateUser(req, res) {
  console.log(req.body); // Check for incoming data
  const { email, password } = req.body;

  try {
    let customerUser = await customersService.getCustomerByEmail(email);

    if (customerUser) {
      // // Log the customerUser object to see what is being retrieved
      // console.log("Customer User Data:", customerUser); 

      if (password === customerUser.password) {

        // Set session details using the utility function
        await sessionManagerService.setCustomerSession(req, customerUser);

        if (customerUser.isAdmin) {
          console.log("Admin Authenticated");
          res.redirect('/admin'); // redirect to admin page

        } else {
          console.log("Customer Authenticated");
          res.redirect('/'); // redirect to home
        }

      } else {
        res.render('login', { root: path, error: "Invalid Password" });
      }
    } else {
      res.render('login', { root: path, error: "User Not Found" });
    }

  } catch (error) {
    console.error('Error autenticate user:', error);
    res.status(500).send('Server error');
  }
}


module.exports = {
  showLoginPage,
  authenticateUser
}