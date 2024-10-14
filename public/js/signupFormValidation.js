document.addEventListener('DOMContentLoaded', function () {
    console.log("Form validation script loaded.");

    document.getElementById('signup-form').addEventListener('submit', function (event) {
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

    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

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
    if (password === '' || confirmPassword === '') {
        errorMessage += '<h4>Password is required.</h4>';
        isValid = false;
    } else if (password !== confirmPassword) {
        errorMessage += '<h4>Passwords do not match.</h4>';
        isValid = false;
    } else if (password.length < 6) {
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
