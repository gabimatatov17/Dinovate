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



///// Canvas Functionality //
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
