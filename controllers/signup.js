const path = require("path").resolve(__dirname, "..");
const signupService = require("../services/signupService");
const customersService = require("../services/customers");
const sessionManagerService = require("../services/sessionsManager");

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
    // Check if the email is already taken
    if (await customersService.getCustomerByEmail(email)) {
      return res.render("signup", {
        root: path,
        error: "Email already taken"
      });
    }

    // Register the new user in the database
    const newUser = await signupService.registerNewUser(firstName, lastName, email, gender, dob, password);

    // Set session details for the newly registered user
    await sessionManagerService.setCustomerSession(req, newUser);

    // Redirect to the home page after registration
    res.redirect("/");

  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  showSignupPage,
  registerUser
}
