
const api = 'http://localhost:3000/api/v1/auth/login';
const loginUser = async (email, password) => {
    try {
        const response = await fetch(api , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        console.log('Login successful:', data);

        // Correctly access the token
        const token = data.data?.token; // Optional chaining to avoid undefined errors
        if (token) {
            localStorage.setItem('token', token);
            console.log('Token saved to localStorage:', token);
        } else {
            console.warn('No token returned by the server.');
        }

        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        alert(error.message);
    }
};

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = await loginUser(email, password);

    if (userData) {
        alert('Login successful!');
        window.location.href = 'dashboard.html';
    }
});