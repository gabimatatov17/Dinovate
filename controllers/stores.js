const path = require("path").resolve(__dirname, "..");
const storesService = require("../services/stores");

// Render the stores page
async function showStoresPage(req, res) {
    try {

        var sessionCostumer = req.session.customer;
        var isAuthenticated = sessionCostumer ? true : false; 

        res.render("stores", {
            root: path,
            googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY, 
            isAuthenticated
        });
    } catch (error) {
        console.error('Error rendering stores page:', error);
        res.status(500).send('Server Error');
    }
}


// API endpoint to get stores details
async function getStoresDetails(req, res) {
    try {
        const storesDetails = await storesService.getStoresDetails();
        res.json(storesDetails);  // Send the store details as JSON
    } catch (error) {
        console.error('Error fetching store details:', error);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    showStoresPage,
    getStoresDetails
}
