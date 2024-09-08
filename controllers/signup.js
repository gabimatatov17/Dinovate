const path = require("path").resolve(__dirname, "..");
const registerService = require("../services/registerService");
const customersService = require("../services/customers");

async function showSignupPage(req, res) {
  res.render("signup", {
    root: path,
    error: null
  });
  console.log("Entered");
}

async function registerUser(req, res) {
  console.log(req.body); // Check the incoming data
  const { firstName, lastName, email, gender, dob, password, confirmPassword } = req.body;
  try {
    if (await customersService.getCustomerByEmail(email)) {
      console.log("email alredy taken")
      return res.render("signup", {
        root: path,
        error: "Email already taken"
      });
    }
    else {
      await registerService.registerNewUser(firstName, lastName, email, gender, dob, password);
      // Render to login page (Optional - can be render to home)
      res.redirect("login", {
        root: path,
        error: null
      });
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