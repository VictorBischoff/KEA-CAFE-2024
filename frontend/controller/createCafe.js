document.getElementById('cafe-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const cafeData = Object.fromEntries(formData.entries());
    cafeData.isVerified = formData.get('isVerified') === 'on'; 

    fetch('/api/cafes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cafeData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Cafe created successfully!');
        } else {
            alert('Failed to create cafe: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while creating the cafe.');
    });
});