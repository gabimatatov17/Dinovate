document.addEventListener('DOMContentLoaded', function () {
    console.log("Form validation script loaded.");

    document.getElementById('login-form').addEventListener('submit', function (event) {
        if (!validateForm()) {
            console.log("Form is invalid, preventing submission.");
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });
});

function validateForm() {
    console.log("validateForm called");

    let isValid = true;
    let errorMessage = '';

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const adminCheckbox = document.getElementById('admin');

    if (adminCheckbox.checked) {
        // Get the value of the checkbox
        console.log("Checkbox is checked. Value: " + adminCheckbox.value);
    } else {
        console.log("Checkbox is not checked.");
    }

    const errorElement = document.querySelector('.client-error-banner');
    errorElement.innerHTML = '';

    // validate email
    if (email === '') {
        errorMessage += '<h4>Email is required.</h4>';
        isValid = false;
    }

    // validate password
    if (password === '') {
        errorMessage += '<h4>Password is required.</h4>';
        isValid = false;
    } else if (password.length < 6) {
        errorMessage += '<h4>Password too short</h4>';
        isValid = false;
    }

    // Check if valid before sending to server
    if (!isValid) {
        errorElement.innerHTML = errorMessage;
        errorElement.style.display = "block"; // Display the error
    }

    return isValid;
}
