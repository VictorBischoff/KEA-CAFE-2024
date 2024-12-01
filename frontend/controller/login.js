document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Assuming user.controller.js has a function named loginUser
    loginUser(email, password).then(response => {
        // Handle response
        console.log(response);
    }).catch(error => {
        // Handle error
        console.error(error);
    });
});