const api = 'http://localhost:3000/api/v1/auth/register'; // Update with the correct endpoint

const registerUser = async (username, email, password) => {
    try {
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
        }

        const data = await response.json();
        console.log('Registration successful:', data);

        // Save token to localStorage
        const token = data.data?.token; // Safely access the token
        if (token) {
            localStorage.setItem('token', token);
            console.log('Token saved to localStorage:', token);
        } else {
            console.warn('No token returned by the server.');
        }

        return data;
    } catch (error) {
        console.error('Error registering user:', error);
        alert(error.message);
    }
};


document.getElementById('user-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = await registerUser(username, email, password);

    if (userData) {
        alert('Registration successful!');
        // Redirect or perform additional actions
        window.location.href = 'index.html'; // Example redirect
    }
});