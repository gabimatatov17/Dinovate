const axios = require('axios');
const Store = require('../models/stores');

async function getStoresDetails() {
    const storesDetails = [];
    const stores = await Store.find({}).exec();

    for (const store of stores) {
        try {
            const coords = await getCoordinates(store.storeAdress);
            storesDetails.push({
                id: store.storeId,
                storeAdress: store.storeAdress,
                storeName: store.storeName,
                storePhoneNumber: store.phoneNumber,
                storeWorkingHours: store.workingHours,
                storeImage: store.imageLocation,
                storeCoordinates: coords
            });
        }
        catch (error) {
            console.error(`Error fetching coordinates for ${store.storeAdress}:`, error);
        }
    }
    return storesDetails;
}

// Function to get coordinates for a single address
async function getCoordinates(address) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Make sure your API key is in the .env file
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error(`Geocoding error: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
}

module.exports = {
    getStoresDetails
}