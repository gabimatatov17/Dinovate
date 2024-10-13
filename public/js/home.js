const filterForm = document.getElementById('filter-form')

filterForm.addEventListener('change', function(e) {
    if (e.target.value === 'All') {
        document.querySelectorAll('input[name="labels"]').forEach(checkbox => {
            checkbox.checked = checkbox.value === 'All';
        });
    } else {
        document.querySelector('input[value="All"]').checked = false;
    }
    updateContent();
});

function updateContent() {
    const form = document.getElementById('filter-form');
    const formData = new FormData(form);
    const queryString = new URLSearchParams(formData).toString();

    axios.get(`/?${queryString}`)
        .then(response => {
            const data = response.data;

            // Update item list
            const container = document.querySelector('.blocks-container');
            container.innerHTML = ''; // Clear current content

            data.filterdProducts.forEach(item => {
                const block = document.createElement('div');
                block.className = 'image-block';
                block.style.backgroundImage = `url('${item.image_location}')`;

                const cardName = document.createElement('p');
                cardName.textContent = item.cardName;

                block.appendChild(cardName);
                container.appendChild(block);

            });

            const filterContainer = document.querySelector('.filter-container');
            filterContainer.innerHTML = ''; // Clear current filters

            data.allLabels.forEach(label => {
                const labelElement = document.createElement('label');
                labelElement.className = 'filter-btn ' + (data.selectedLabels.includes(label) ? 'active' : '');

                const input = document.createElement('input');
                input.type = 'checkbox';
                input.name = 'labels';
                input.value = label;
                if (data.selectedLabels.includes(label)) {
                    input.checked = true;
                }

                labelElement.appendChild(input);
                labelElement.appendChild(document.createTextNode(label));

                filterContainer.appendChild(labelElement);
            });

            // Update URL
            history.pushState(null, '', `/?${queryString}`);
        })
        .catch(error => console.error('Error:', error));
}
