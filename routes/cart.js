const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");

router.get('/', cartController.showCart);
module.exports = router;