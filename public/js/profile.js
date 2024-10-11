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
