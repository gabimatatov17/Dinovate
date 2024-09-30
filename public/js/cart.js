// public/js/cart.js

document.addEventListener('DOMContentLoaded', () => {
    updateCartTotal();

    // Add event listeners for the plus and remove buttons
    document.querySelectorAll('.add-button').forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });

    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', handleRemoveFromCart);
    });
});

// Function to handle adding an item to the cart
async function handleAddToCart(event) {
    const button = event.target;
    const cardId = button.closest('tr').dataset.cardid;

    try {
        const response = await axios.post('/cart/add', { cardId });
        const result = response.data;

        if (result.success) {
            updateCartTotal();  // Update cart total after success
            location.reload();  // Reload the page to reflect the changes
        } else {
            alert(result.message);  // Show message for large orders
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
        alert('Error adding item to cart');
    }
}

// Function to handle removing an item from the cart
async function handleRemoveFromCart(event) {
    const button = event.target;
    const cardId = button.closest('tr').dataset.cardid;

    try {
        const response = await axios.post('/cart/remove', { cardId });
        const result = response.data;

        if (result.success) {
            updateCartTotal();  // Update cart total after success
            location.reload();  // Reload the page to reflect the changes
        } else {
            alert('Error removing item from cart');
        }
    } catch (error) {
        console.error('Error removing item from cart:', error);
        alert('Error removing item from cart');
    }
}


// Function to update cart total
function updateCartTotal() {
    let total = 0;
    const cartItems = document.getElementsByClassName('cart-item');

    for (let i = 0; i < cartItems.length; i++) {
        const priceElement = cartItems[i].getElementsByClassName('cart-price')[0];
        const price = parseFloat(priceElement.innerText.replace('₪', ''));
        const quantity = parseInt(cartItems[i].getElementsByClassName('quantity')[0].innerText);
        total += price * quantity;
    }

    total = Math.round(total * 100) / 100;
    document.getElementById('items-total').innerText = total.toFixed(2);
}

// Address validation submission
document.getElementById('address-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const street = document.getElementById('street').value.trim();
    const locality = document.getElementById('locality').value.trim();
    const postal_code = document.getElementById('postal_code').value.trim();

    const messageElement = document.getElementById('validation-message');
    messageElement.textContent = ''; // Clear previous messages

    // Client-side validation to ensure all fields are filled
    if (!street || !locality || !postal_code) {
        messageElement.textContent = 'Please fill in all the required fields.';
        messageElement.style.color = 'red';
        return;
    }

    try {
        // Send the address data to the server for validation
        const response = await axios.post('/cart/validate-address', {
            street,
            locality,
            postal_code,
            country: 'ISR'
        });

        const result = response.data;

        console.log('result=', result)
        // Handle the API response and display the result to the user
        if (result.valid) {
            // Display the order placed message with animation
            const orderPlacedMessage = document.getElementById('order-placed-message');
            const orderIdElement = document.getElementById('order-id');

            console.log('result.order.orderId', result.order.orderId)
            // Update the message to include the order ID
            orderIdElement.innerText = `Your order ID is: ${result.order.orderId}`;

            orderPlacedMessage.style.display = 'flex'; // Show popup

            // Optionally, redirect to another page after a delay
            setTimeout(() => {
                // Redirect or hide the message
                orderPlacedMessage.style.display = 'none';
                window.location.href = '/profile'; // Redirect if needed
            }, 3000);
        } else {
            messageElement.textContent = result.message; // Display error message from the server
            messageElement.style.color = 'red';
        }
    } catch (error) {
        // Handle unexpected errors (e.g., network issues)
        messageElement.textContent = 'Error occurred while validating the address. Please try again later.';
        messageElement.style.color = 'red';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for the "Generate Greeting" button
    document.querySelectorAll('.generate-greeting-btn').forEach(button => {
        button.addEventListener('click', function() {
            alert('Generate Greeting button clicked!');  // Placeholder functionality
        });
    });
});

