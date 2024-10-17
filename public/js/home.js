const filterForm = document.getElementById('filter-form')

filterForm.addEventListener('change', function(e) {
    if (e.target.value === 'All') {
        document.querySelectorAll('input[name="labels"]').forEach(checkbox => {
            checkbox.checked = checkbox.value === 'All';
        });
    } else {
        document.querySelector('input[value="All"]').checked = false;
    }
    updateContent();
});

function updateContent() {
    const form = document.getElementById('filter-form');
    const formData = new FormData(form);
    const queryString = new URLSearchParams(formData).toString();

    axios.get(`/?${queryString}`)
        .then(response => {
            const data = response.data;

            // Update item list
            const container = document.querySelector('.blocks-container');
            container.innerHTML = ''; // Clear current content

            data.filterdProducts.forEach(item => {
                const block = document.createElement('div');
                block.className = 'image-block';
                block.style.backgroundImage = `url('${item.image_location}')`;

                // Create the h1 for card name
                const cardName = document.createElement('h1');
                cardName.textContent = `Name: ${item.cardName.replace(/_/g, " ")}`;

                // Create the h2 for card price
                const cardPrice = document.createElement('h2');
                cardPrice.textContent = `Price: ${item.price}$`;

                // Create the h2 for added date
                const cardDate = document.createElement('h2');
                const addedDate = new Date(item.dateAdded);
                cardDate.textContent = `Added Date: ${addedDate.getDate()}/${addedDate.getMonth() + 1}/${addedDate.getFullYear()}`;

                block.appendChild(cardName);
                block.appendChild(cardPrice);
                block.appendChild(cardDate);

                const addToCartButton = document.createElement('button');
                addToCartButton.id = 'add-to-cart-button';
                addToCartButton.textContent = 'Add to Cart';
                addToCartButton.type = 'button';

                // Set the onclick event handler to call addToCart function
                addToCartButton.onclick = function () {
                    addToCart(item.cardId, item.cardName, item.price, item.image_location);
                };

                // Append the button to the imageBlock
                block.appendChild(addToCartButton);

                container.appendChild(block);

            });

            const filterContainer = document.querySelector('.filter-container');
            filterContainer.innerHTML = ''; // Clear current filters

            data.allLabels.forEach(label => {
                const labelElement = document.createElement('label');
                labelElement.className = 'filter-btn ' + (data.selectedLabels.includes(label) ? 'active' : '');

                const input = document.createElement('input');
                input.type = 'checkbox';
                input.name = 'labels';
                input.value = label;
                if (data.selectedLabels.includes(label)) {
                    input.checked = true;
                }

                labelElement.appendChild(input);
                labelElement.appendChild(document.createTextNode(label));

                filterContainer.appendChild(labelElement);
            });

            // Update URL
            history.pushState(null, '', `/?${queryString}`);
        })
        .catch(error => console.error('Error:', error));

}

function addToCart(cardId, cardName, price, image) {
    fetch('/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cardId, cardName, price, image })
    })
    .then(response => response.json())
    .then(data => {
        // Handle response (e.g., show a message, update cart display)
        console.log('Card added:', data);
        if (data.cart) {
            showAddedToCartPopup(cardName);  // Show popup when item is added
        }
    })
    .catch(error => {
        console.error('Error adding item to cart:', error);
    });
}

// Function to show popup when item is added to cart
function showAddedToCartPopup(cardName) {
    const popup = document.getElementById('item-added-popup');
    const popupText = document.getElementById('popup-text');
    
    // Set the message
    popupText.innerText = `${cardName} has been added to your cart!`;
    
    popup.style.display = 'flex';  // Show popup
    
    // Hide the popup after 3 seconds
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}
