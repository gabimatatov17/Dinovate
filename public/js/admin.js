function editItem(item) {

    item = JSON.parse(item);
    window.alert("Editting " + item.cardName);

}
function deleteItem(item) {

    item = JSON.parse(item);
    if (confirm("Are you sure you want to delete  " + item.cardName + "?")) {
        // Send a DELETE request to the backend
        fetch(`/admin/${item.cardId}`, {
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