const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signup");

router.get('/', signupController.showSignupPage);
module.exports = router;