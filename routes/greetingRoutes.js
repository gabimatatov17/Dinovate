const express = require('express');
const router = express.Router();
const greetingController = require('../controllers/greetingController');

// POST route to generate a greeting
router.post('/generate-greeting', greetingController.generateGreeting);

module.exports = router;
