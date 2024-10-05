// Initialize the map function
function initMap(storesDetails) {
    const mapOptions = {
        center: { lat: 32.0853, lng: 34.7818 }, // Tel Aviv
        zoom: 12,
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Iterate through the storesDetails array and create markers
    storesDetails.forEach(store => {
        const { storeCoordinates, storeAdress } = store;

        // Create a new marker for each store
        const marker = new google.maps.Marker({
            position: storeCoordinates,
            map: map,
            title: storeAdress
        });

        // Add an info window for each store
        const infoWindow = new google.maps.InfoWindow({
            content: `<div><strong>${storeAdress}</strong></div>`
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });

        addStoreDetails(store);
    });
}


// Function to create and display store details
function addStoreDetails(store) {
    const storeList = document.getElementById('store-list');

    // Create a new div for each store
    const storeDiv = document.createElement('div');
    storeDiv.className = 'store-card';

    // Add store address and coordinates to the div
    storeDiv.innerHTML = `
        <div class="store-image">
            <img src="${store.storeImage}" alt="Store Image">
        </div>
        <div class="store-details">
            <h4 style="font-weight: bold; font-size: 18px;">${store.storeName}</h4>
            <h4>${store.storeAdress}</h4>
            <h4>Opening Hours: ${store.storeWorkingHours}</h4>
            <h4>Opening Days: Sunday - Friday</h4>
        </div>
        <div class="store-phone">
            <h4>Call Us</h4>
            <p class="phone-number">
            <i class="bi bi-telephone"></i>${store.storePhoneNumber}</p>
        </div>
    `;

    // Append the store div to the store list
    storeList.appendChild(storeDiv);
}


// Function to fetch store details using jQuery AJAX
function fetchStoreDetails() {
    return $.ajax({
        url: 'stores/api/getStoresDetails',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            storesDetails = data;
            // Call initMap once storesDetails are fetched
            initMap(storesDetails);
        },
        error: function (err) {
            console.error('Error fetching store details:', err);
        }
    });
}


// Fetch store details and then initialize the map
$(document).ready(function () {
    fetchStoreDetails();
});
