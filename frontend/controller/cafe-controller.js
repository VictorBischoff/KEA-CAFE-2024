// Define the entities array to hold the fetched data
let entities = [];

async function fetchCafes() {
    try {
        const response = await fetch('http://localhost:3000/api/v1/cafes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch cafes: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Cafes fetched from the backend:', data);

        const cafes = Array.isArray(data) ? data : data.data; // Handle direct array or wrapped in 'data'
        if (!Array.isArray(cafes)) {
            throw new Error('Invalid data format received from API');
        }

        entities = cafes.map(cafe => ({
            id: cafe.id,
            title: cafe.name,
            description: cafe.description || 'No description available.',
            website: cafe.website,
            phone: cafe.phone,
            address: cafe.address,
            avgRating: cafe.avgRating,
            tags: [cafe.city, cafe.country], // Example tags
            image: 'https://via.placeholder.com/300', // Placeholder image
        }));

        generateEntities();
    } catch (error) {
        console.error('Error fetching cafes:', error);
    }
}

// Generate cafes based on the fetched data
function generateEntities() {
    const entitiesSection = document.querySelector('.entities-section');
    entitiesSection.innerHTML = ''; // Clear existing content

    entities.forEach(entity => {
        const entityDiv = document.createElement('div');
        entityDiv.className = 'entity';
        entityDiv.innerHTML = `
            <img src="${entity.image}" alt="${entity.title}" width="300" height="300">
            <h3>${entity.title}</h3>
            <p>Tags: ${entity.tags.join(', ')}</p>
            <p>${entity.description.slice(0, 50)}...</p>
            <p>Average Rating: ${entity.avgRating}</p>
        `;
        entityDiv.addEventListener('click', () => highlightEntity(entity));
        entitiesSection.appendChild(entityDiv);
    });
}

// Toggle favorite status
async function toggleFavorite(event, cafeId) {
    event.stopPropagation(); // Prevent triggering the card click event
    const icon = event.target;
    const isFavorited = icon.classList.contains('favorited');

    try {
        if (isFavorited) {
            // Unfavorite the cafe
            const response = await fetch(`http://localhost:3000/api/favorites/${cafeId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include user token if needed
                },
            });

            if (!response.ok) {
                throw new Error('Failed to unfavorite the cafe.');
            }

            icon.classList.remove('favorited');
            icon.innerHTML = '&#9734;';
        } else {
            // Favorite the cafe
            const response = await fetch('http://localhost:3000/api/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include user token if needed
                },
                body: JSON.stringify({ userId: getLoggedInUserId(), cafeId }),
            });

            if (!response.ok) {
                throw new Error('Failed to favorite the cafe.');
            }

            icon.classList.add('favorited');
            icon.innerHTML = '&#9733;';
        }
    } catch (error) {
        console.error('Error toggling favorite:', error);
    }
}

// Helper function to get the logged-in user ID
function getLoggedInUserId() {
    // Example: Decode user ID from a JWT token stored in localStorage
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.userId;
    } catch {
        return null;
    }
}


// Generate for the highlight section
function highlightEntity(entity) {
    document.querySelectorAll('.entity').forEach(el => el.classList.remove('highlighted'));
    const selectedEntity = entities.find(e => e.id === entity.id);
    document.querySelector('.details-content').innerHTML = `
        <div class="favorite-icon" onclick="toggleFavorite(event, ${entity.id})">&#9734;</div>
        <img src="${entity.image}" alt="${entity.title}" width="300" height="300">
        <h3>${selectedEntity.title}</h3>
        <p>Tags: ${selectedEntity.tags.join(', ')}</p>
        <p>${selectedEntity.description}</p>
        <a href="${selectedEntity.website}" target="_blank">Website</a>
        <p>Phone: ${selectedEntity.phone}</p>
        <p>Address: ${selectedEntity.address}</p>
        <p>Average Rating: ${selectedEntity.avgRating}</p
    `;
}

// Initialize
window.onload = () => {
    fetchCafes(); // Fetch data and generate entities
};