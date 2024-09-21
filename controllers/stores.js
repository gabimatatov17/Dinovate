const path = require("path").resolve(__dirname, "..");
const storesService = require("../services/stores");


async function showStoresPage(req, res) {
    try {
        const storesDetails = await storesService.getStoresDetails();
        res.render("stores", {
            root: path,
            googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
            storesDetails
        });
    } catch (error) {
        console.error('Error fetching store coordinates:', error);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    showStoresPage
}
