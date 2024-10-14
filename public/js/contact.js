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
const numberOfCards = 10; 

function createCard() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height, 
        size: 50 + Math.random() * 50, 
        speed: 2 + Math.random() * 3, 
        alpha: Math.random() * 0.5 + 0.2, 
        color: Math.random() * 360, 
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
        ctx.fillStyle = `hsla(${card.color}, 100%, 75%, ${card.alpha})`; 

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
