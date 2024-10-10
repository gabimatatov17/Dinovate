const express = require("express");
const router = express.Router();
const storesController = require("../controllers/stores")

router.get('/', storesController.showStoresPage);

// API route to fetch store details via AJAX
router.get('/api/getStoresDetails', storesController.getStoresDetails);

module.exports = router;