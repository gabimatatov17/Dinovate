const express = require("express");
const router = express.Router();
const storesController = require("../controllers/stores")

router.get('/', storesController.showStoresPage);

module.exports = router;