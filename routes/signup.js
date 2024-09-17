const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signup");

router.get('/', signupController.showSignupPage);
router.post('/', signupController.registerUser)
module.exports = router;