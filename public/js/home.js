document.getElementById('card-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const title = document.getElementById('title').value;
    const message = document.getElementById('message').value;

    // Update card preview
    document.getElementById('card-title').textContent = title;
    document.getElementById('card-message').textContent = message;
});
