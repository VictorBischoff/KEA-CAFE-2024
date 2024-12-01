document.addEventListener('DOMContentLoaded', async () => {
    const navbarContainer = document.getElementById('navbar-container');

    try {
        // Fetch the navbar template
        const response = await fetch('navbar.html');
        if (!response.ok) {
            throw new Error('Failed to load navbar template');
        }

        const html = await response.text();
        const template = document.createElement('div');
        template.innerHTML = html.trim();

        // Extract the template content and insert into the container
        const navbarTemplate = template.querySelector('#navbar-template');
        const navbarContent = navbarTemplate.content.cloneNode(true);

        navbarContainer.appendChild(navbarContent);
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
});