const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact");

router.get('/', contactController.showContactPage);
module.exports = router;