const express = require('express');
const router = express.Router();

// Logout route
router.get('/', (req, res) => {
    // Destroy the user session
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Could not log out.");
        }
        // Redirect to home page after logout
        res.redirect('/');
    });
});

module.exports = router;