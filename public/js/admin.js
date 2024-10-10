function showElement() {

    // get the selected
    const selected = document.querySelector('input[name="options"]:checked');

    // check if a radio button is selected
    if (selected) {

        var selectedID = selected.id;
        var products = document.getElementById('products');
        var stores = document.getElementById('stores');
        var orders = document.getElementById('orders');

        switch (selectedID) {

            case "Products":

                products.style.display = 'block';
                stores.style.display = 'none';
                orders.style.display = 'none';
            
            case "Stores":

                products.style.display = 'none';
                stores.style.display = 'block';
                orders.style.display = 'none';
            
            case "Orders":

                products.style.display = 'none';
                stores.style.display = 'none';
                orders.style.display = 'block';

        }


    } else {

        console.log('nothing is selected');
        
    }

}

function editItem(item, type) {

    item = JSON.parse(item);
    window.alert("Editting " + item.cardName);

}

function deleteItem(item, type) {

    item = JSON.parse(item);
    if (confirm("Are you sure you want to delete  " + item.cardName + "?")) {
        fetch(`/admin/${type}/${item.cardId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            if (data.status == 200) {

                window.alert("successfully deleted " + item.cardName);

            }
            else {

                window.alert("could not delete " + item.cardName + ": " + data.message);

            }
            
            // Optionally, refresh the page or remove the item from the DOM
            location.reload(); // Reloads the page to reflect changes
        })
        .catch(error => {
            window.alert("Error deleting item: " + error.message);
        });
    }

}

function showPopUp() {

    var popup = document.getElementById('popupSection');
    popup.style.display = "block";

}