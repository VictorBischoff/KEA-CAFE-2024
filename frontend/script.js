/*
// Midlertidige test data
const entities = [
    { id: 1, title: "Entitet 1", description: "Beskrivelse for Entitet 1 aaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaa aaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.", tags: ["Tag1", "Tag2"], image: "https://i.pinimg.com/736x/0a/96/8c/0a968c54c6156a814367f3961bfe8ff3.jpg" },
    { id: 2, title: "Entitet 2", description: "Beskrivelse for Entitet 2.", tags: ["Tag3"], image: "https://i.pinimg.com/736x/0a/96/8c/0a968c54c6156a814367f3961bfe8ff3.jpg" },
    { id: 3, title: "Entitet 3", description: "Beskrivelse for Entitet 3.", tags: ["Tag3"], image: "https://i.pinimg.com/736x/0a/96/8c/0a968c54c6156a814367f3961bfe8ff3.jpg" },
    { id: 4, title: "Entitet 4", description: "Beskrivelse for Entitet 4.", tags: ["Tag3"], image: "https://i.pinimg.com/736x/0a/96/8c/0a968c54c6156a814367f3961bfe8ff3.jpg" },
    { id: 5, title: "Entitet 5", description: "Beskrivelse for Entitet 5.", tags: ["Tag3"], image: "https://i.pinimg.com/736x/0a/96/8c/0a968c54c6156a814367f3961bfe8ff3.jpg" },
    { id: 6, title: "Entitet 6", description: "Beskrivelse for Entitet 6.", tags: ["Tag3"], image: "https://i.pinimg.com/736x/0a/96/8c/0a968c54c6156a814367f3961bfe8ff3.jpg" },
    { id: 7, title: "Entitet 7", description: "Beskrivelse for Entitet 7.", tags: ["Tag3"], image: "https://i.pinimg.com/736x/0a/96/8c/0a968c54c6156a814367f3961bfe8ff3.jpg" },
    { id: 8, title: "Entitet 8", description: "Beskrivelse for Entitet 8.", tags: ["Tag3"], image: "https://i.pinimg.com/736x/0a/96/8c/0a968c54c6156a814367f3961bfe8ff3.jpg" },
    { id: 9, title: "Entitet 9", description: "Beskrivelse for Entitet 9.", tags: ["Tag3"], image: "https://i.pinimg.com/736x/0a/96/8c/0a968c54c6156a814367f3961bfe8ff3.jpg" },
];

// Generer entiteter ud fra hentet data
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
*/
