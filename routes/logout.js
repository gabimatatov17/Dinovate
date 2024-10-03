const express = require('express');
const router = express.Router();

// Logout route
router.get('/', (req, res) => {
    // Destroy the user session
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Could not log out.");
        }
        // Redirect to the login page or home page after logout
        // Or redirect to login page
        res.redirect('/');
    });
});

module.exports = router;