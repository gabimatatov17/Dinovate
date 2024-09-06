function togglePassword() {
    const passwordField = document.getElementById('password');
    const passwordToggle = document.querySelector('.toggle-password');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        passwordToggle.textContent = '🙈';
    } else {
        passwordField.type = 'password';
        passwordToggle.textContent = '👁️';
    }
}

function togglePasswordConfirm() {
    const confirmPasswordField = document.getElementById('confirm-password');
    const passwordToggle = confirmPasswordField.nextElementSibling;
    
    if (confirmPasswordField.type === 'password') {
        confirmPasswordField.type = 'text';
        passwordToggle.textContent = '🙈';
    } else {
        confirmPasswordField.type = 'password';
        passwordToggle.textContent = '👁️';
    }
}
