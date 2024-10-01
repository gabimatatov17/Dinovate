const toggleButton = document.getElementById('toggle-button');
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('main');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    mainContent.classList.toggle('shift');
});

function toggleProfileOptions() {
    const options = document.getElementById('profile-options');
    options.style.display = options.style.display === 'none' ? 'block' : 'none';
}
