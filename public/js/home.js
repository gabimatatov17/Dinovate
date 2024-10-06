const logoutLink = document.getElementById('logout-link')

logoutLink.addEventListener('click', function (event) {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (!confirmLogout) {
        event.preventDefault(); // Prevent the default action if user cancels
    }
});