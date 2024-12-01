document.addEventListener("DOMContentLoaded", () => {
    const includeHTML = async (selector, file) => {
        console.log(`Fetching ${file} to insert into ${selector}`);
        const response = await fetch(file);
        if (response.ok) {
            const text = await response.text();
            console.log(`Fetched content: ${text}`);
            const template = document.createElement('template');
            template.innerHTML = text.trim();
            const content = template.content.firstElementChild;
            const element = document.querySelector(selector);
            if (element) {
                element.appendChild(content);
                console.log(`Inserted content into ${selector}`);
            } else {
                console.error('Element not found for selector:', selector);
            }
        } else {
            console.error('Error loading file:', file);
        }
    };

    includeHTML("#navbar-container", "navbar.html");
});