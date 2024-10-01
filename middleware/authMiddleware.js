
function ensureAuthenticated(req, res, next) {
    if (req.session.customer) {
        // User is authenticated, allow access to requested route
        return next();
    }
    // If not authenticated, redirect to the login page
    res.redirect('/login');
}

module.exports = { ensureAuthenticated };
