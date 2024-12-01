// Temporary test data for cafes
const cafes = [
    { id: 1, title: "Cafe 1", description: "Beskrivelse for cafe 1.", tags: ["Tag1", "Tag2"], image: "https://i.pinimg.com/736x/0a/96/8c/0a968c54c6156a814367f3961bfe8ff3.jpg" },
    { id: 2, title: "Cafe 2", description: "Beskrivelse for cafe 2.", tags: ["Tag3"], image: "https://i.pinimg.com/736x/0a/96/8c/0a968c54c6156a814367f3961bfe8ff3.jpg" }
];

// Temporary test data for users
const users = [
    { id: 1, title: "User 1", description: "Beskrivelse for user 1.", tags: ["Tag1", "Tag2"], image: "https://i.pinimg.com/736x/0a/96/8c/0a968c54c6156a814367f3961bfe8ff3.jpg" },
    { id: 2, title: "User 2", description: "Beskrivelse for user 2.", tags: ["Tag3"], image: "https://i.pinimg.com/736x/0a/96/8c/0a968c54c6156a814367f3961bfe8ff3.jpg" }
];

// Function to update the cafe entity section
function updateCafeEntity(cafe) {
    document.getElementById('cafe-image').src = cafe.image;
    document.getElementById('cafe-name').textContent = cafe.title;
    document.getElementById('cafe-description').textContent = cafe.description;
}

// Function to update the user entity section
function updateUserEntity(user) {
    document.getElementById('user-image').src = user.image;
    document.getElementById('user-name').textContent = user.title;
    document.getElementById('user-description').textContent = user.description;
}

// Update the sections with the first entity from each list
document.addEventListener('DOMContentLoaded', () => {
    updateCafeEntity(cafes[0]);
    updateUserEntity(users[0]);
});