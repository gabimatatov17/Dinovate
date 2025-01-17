const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact");

router.get('/', contactController.showContactPage);
router.post('/', contactController.receiveContactMessage);
module.exports = router;