function closePopup(event) {
    // Check if the click event occurred on the overlay or the close icon
    if (event.target.classList.contains('modal-overlay') || event.target.classList.contains('close-icon')) {
        document.querySelector('#popupSection').style.display = 'none';
    }
}

function createItem(type) {
    
    event.preventDefault();

    switch (type) {

        case "products":

            // Get the form data
            const cardName = document.getElementById('cardName').value;
            const price = document.getElementById('price').value;
            const labels = document.getElementById('labels').value;
            const image_location = document.getElementById('image_location').value;

            if (confirm("Are you sure you want to create  " + cardName + "?")) {
                fetch(`/admin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type,
                        cardName,
                        price,
                        labels,
                        image_location
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {

                    window.alert(data.message);
                    location.reload(); 
                    
                })
                .catch(error => {
                    window.alert("Error creating item: " + error.message);
                });
            }

    }

}