const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');

// Route to render the profile page with the user's orders and information
router.get('/', profileController.showProfile);

// Route to handle profile updates
router.post('/update', profileController.updateProfile);

module.exports = router;
