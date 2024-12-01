// Midlertidige test data
const entities = [
    { id: 1, title: "user 1", description: "Og information på brugeren som andre folk må se?", tags: ["Reviews tænker jeg skal stå her lign, ligesom tags at henvise til reviewed"], image: "https://i.pinimg.com/736x/0a/96/8c/0a968c54c6156a814367f3961bfe8ff3.jpg" },
    { id: 2, title: "user 2", description: "Og information på brugeren som andre folk må se?", tags: ["Reviews tænker jeg skal stå her lign"], image: "https://i.pinimg.com/736x/0a/96/8c/0a968c54c6156a814367f3961bfe8ff3.jpg" },
    { id: 3, title: "user 3", description: "Og information på brugeren som andre folk må se?", tags: ["Reviews tænker jeg skal stå her lign"], image: "https://i.pinimg.com/736x/0a/96/8c/0a968c54c6156a814367f3961bfe8ff3.jpg" },
    { id: 4, title: "user 4", description: "Og information på brugeren som andre folk må se?", tags: ["Reviews tænker jeg skal stå her lign"], image: "https://i.pinimg.com/736x/0a/96/8c/0a968c54c6156a814367f3961bfe8ff3.jpg" },
    { id: 5, title: "user 5", description: "Og information på brugeren som andre folk må se?", tags: ["Reviews tænker jeg skal stå her lign"], image: "https://i.pinimg.com/736x/0a/96/8c/0a968c54c6156a814367f3961bfe8ff3.jpg" },
    { id: 6, title: "user 6", description: "Og information på brugeren som andre folk må se?", tags: ["Reviews tænker jeg skal stå her lign"], image: "https://i.pinimg.com/736x/0a/96/8c/0a968c54c6156a814367f3961bfe8ff3.jpg" },
    { id: 7, title: "user 7", description: "Og information på brugeren som andre folk må se?", tags: ["Reviews tænker jeg skal stå her lign"], image: "https://i.pinimg.com/736x/0a/96/8c/0a968c54c6156a814367f3961bfe8ff3.jpg" },
    { id: 8, title: "user 8", description: "Og information på brugeren som andre folk må se?", tags: ["Reviews tænker jeg skal stå her lign"], image: "https://i.pinimg.com/736x/0a/96/8c/0a968c54c6156a814367f3961bfe8ff3.jpg" },
    { id: 9, title: "user 9", description: "Og information på brugeren som andre folk må se?", tags: ["Reviews tænker jeg skal stå her lign"], image: "https://i.pinimg.com/736x/0a/96/8c/0a968c54c6156a814367f3961bfe8ff3.jpg" },
];

// Generer userer ud fra hentet data
function generateEntities() {
    const entitiesSection = document.querySelector('.entities-section');
    
    entities.forEach(entity => {
        const entityDiv = document.createElement('div');
        entityDiv.className = 'entity';
        entityDiv.innerHTML = `
            <img src="${entity.image}" alt="${entity.title}" width="300" height="300">
            <h3>${entity.title}</h3>
            <p>Tags: ${entity.tags.join(', ')}</p>
            <p>${entity.description.slice(0, 50)}...</p>
            
        `;
        entityDiv.addEventListener('click', () => highlightEntity(entity));
        entitiesSection.appendChild(entityDiv);
    });
}

// Generer til highlight sectionen
function highlightEntity(entity) {
    document.querySelectorAll('.entity').forEach(el => el.classList.remove('highlighted'));
    const selectedEntity = entities.find(e => e.id === entity.id);
    document.querySelector('.details-content').innerHTML = `
        <img src="${entity.image}" alt="${entity.title}" width="300" height="300">
        <h3>${selectedEntity.title}</h3>
        <p>Tags: ${selectedEntity.tags.join(', ')}</p>
        <p>${selectedEntity.description}</p>
    `;
}

// Initialize
window.onload = () => {
    generateEntities();
};
