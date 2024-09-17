const path = require("path").resolve(__dirname, "..");
const signupService = require("../services/signupService");
const customersService = require("../services/customers");

async function showSignupPage(req, res) {
  res.render("signup", {
    root: path,
    error: null
  });
}

async function registerUser(req, res) {
  console.log(req.body); // Check the incoming data
  const { firstName, lastName, email, gender, dob, password, confirmPassword } = req.body;
  try {
    if (await customersService.getCustomerByEmail(email)) {
      return res.render("signup", {
        root: path,
        error: "Email already taken"
      });
    }
    else {
      await signupService.registerNewUser(firstName, lastName, email, gender, dob, password);
      // Render to home page
      res.redirect("/")
    }
  }
  catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  showSignupPage,
  registerUser
}