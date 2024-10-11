const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');
const authenticationMiddleware = require('../middleware/authMiddleware');

// If a user is not authenticated, he will be redirected to the login page.
router.use(authenticationMiddleware.ensureAuthenticated);

// Route to render the profile page with the user's orders and information
router.get('/', profileController.showProfile);

// Route to handle profile updates
router.post('/update', profileController.updateProfile);

router.delete('/delete', profileController.deleteUser);

module.exports = router;
