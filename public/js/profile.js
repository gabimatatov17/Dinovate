// Elements
const deleteUserBtn = document.getElementById('delete-user-btn');
const deleteConfirmationModal = document.getElementById('delete-confirmation-modal');
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
const cancelDeleteBtn = document.getElementById('cancel-delete-btn');

// Show modal on delete button click
deleteUserBtn.addEventListener('click', () => {
    deleteConfirmationModal.style.display = 'flex';
});

// Close modal on cancel button
cancelDeleteBtn.addEventListener('click', () => {
    deleteConfirmationModal.style.display = 'none';
});

// Confirm delete action
confirmDeleteBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('/profile/delete', {
            method: 'DELETE',
        });
        
        if (response.ok) {
            window.location.href = '/signup';  // Redirect to signup page
        } else {
            console.error('Failed to delete user.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});


/////// Update Form Validation ///////

document.addEventListener('DOMContentLoaded', function () {
    console.log("Form validation script loaded.");

    document.getElementById('profile-form').addEventListener('submit', function (event) {
        if (!validateForm()) {
            console.log("Form is invalid, preventing submission.");
            event.preventDefault(); // Prevent form submission if validation fails
        } else {
            alert("Your personal information has been updated successfully");
        }
    });
});

function validateForm() {
    console.log("validateForm called");

    let isValid = true;
    let errorMessage = '';

    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const errorElement = document.querySelector('.client-error-banner');
    errorElement.innerHTML = '';

    // validate first name
    if (firstName === '') {
        errorMessage += '<h4>First name is required.</h4>';
        isValid = false;
    }

    // validate last name
    if (lastName === '') {
        errorMessage += '<h4>Last name is required.</h4>';
        isValid = false;
    }

    // validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        errorMessage += '<h4>Email is required.</h4>';
        isValid = false;
    } else if (!emailPattern.test(email)) {
        errorMessage += 'Please enter a valid email address.<br>';
        isValid = false;
    }

    // validate password
    if (password.length > 0 && password.length < 6) {
        errorMessage += '<h4>Password must be at least 6 characters long.</h4>';
        isValid = false;
    }

    // validate dob
    if (!dob) {
        isValid = false;
        errorMessage += '<h4>Birth date not selected</h4>';
    } else {
        const selectedDob = new Date(dob);
        const today = new Date();
        const minDate = new Date("1900-01-01");

        selectedDob.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        minDate.setHours(0, 0, 0, 0);

        if (selectedDob > today) {
            isValid = false;
            errorMessage += '<h4>Birth date invalid.</h4>';
        }

        if (selectedDob < minDate) {
            errorMessage += '<h4>Birthdate must be after Jan 1, 1900.</h4>';
            isValid = false;
        }
    }

    if (!isValid) {
        errorElement.innerHTML = errorMessage;
        errorElement.style.display = "block"; // Display the error
    }

    return isValid;
}


///// Canvas Visualization /////
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Set canvas to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const cards = [];
const numberOfCards = 10; // Reduced number of cards

function createCard() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height, // Start above the canvas
        size: 50 + Math.random() * 50, // Random size
        speed: 2 + Math.random() * 3, // Random speed
        alpha: Math.random() * 0.5 + 0.2, // Random transparency (0.2 - 0.7)
        color: Math.random() * 360, // Random color hue
    };
}

// Populate the cards array
for (let i = 0; i < numberOfCards; i++) {
    cards.push(createCard());
}

function animateCards() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cards.forEach(card => {
        // Set color with transparency
        ctx.fillStyle = `hsla(${card.color}, 100%, 75%, ${card.alpha})`; // Use HSLA for color with transparency

        // Draw the card
        ctx.fillRect(card.x, card.y, card.size, card.size);

        // Move the card down
        card.y += card.speed;

        // Reset position when it goes off the screen
        if (card.y > canvas.height) {
            card.y = -card.size;
            card.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(animateCards);
}

// Start the animation
animateCards();