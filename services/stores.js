const axios = require('axios');
const Store = require('../models/stores');


// Function to get return stores details
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


async function removeStore(storeID) {
    const resp = await Store.deleteOne({storeId: storeID}).then(result => {
        if (result.deletedCount == 0) {
            return Promise.reject({status: 500, message: "Store not found"});
        }
        return Promise.resolve({status: 200});
    }).catch(e => {
        return Promise.reject({status: 500, message: e});
    });
    return resp;
}


async function editStore(storeID, data) {
    try {
        const result = await Store.updateOne({ storeId: storeID }, data, { 
            runValidators: true
        });

        if (result.modifiedCount == 0) {
            return ({status: 500, message: "No changes commited"});

        }
        return ({status: 200, message: "Success" });
    } catch (e) {
        console.error('Error updating item:', error);
        return ({status: 500, message: e});
    }
}


async function getAllStores() {

    try {

        const stores = await Store.find().exec();
        return stores;

    } catch (error) {

        console.error('Error finding stores: ', error);
        return null;

    }

}


async function createStore(document) {

    try {

        // Check if a store with the same storeName already exists
        const existingStore = await Store.findOne({ storeName: document.storeName });
        if (existingStore) {
            return { status: 400, message: 'Store name already exists.' };
        }

        // Count the stores
        const storeCount = await Store.countDocuments();
        document.storeId = storeCount + 1;

        const store = await Store.create(document);

        return {
            status: 200,
            message: "success"
        };

    }
    catch (err) {

        return {
            status: 500,
            message: `could not create store: ${err}`
        };

    }

}

module.exports = {
    getStoresDetails,
    removeStore,
    editStore,
    getAllStores,
    createStore
}