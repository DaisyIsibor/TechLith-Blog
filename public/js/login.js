const loginFormHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Get username and password from the form inputs
    const username = document.querySelector('#signin-username').value.trim();
    const password = document.querySelector('#signin-password').value.trim();

    // Check if username and password are provided
    if (username && password) {
        try {
            // Send a POST request to the login endpoint
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            // Check if the response is successful
            if (response.ok) {
                // Redirect to the profile page after successful login
                window.location.href = '/profile';
            } else {
                // Display an error message if login fails
                alert('Login failed. Please check your username and password.');
            }
        } catch (err) {
            console.error('Error:', err); // Log any errors for debugging
            alert('An error occurred while logging in. Please try again later.');
        }
    } else {
        // Display an error message if username or password is empty
        alert('Please enter your username and password.');
    }
};

// Add event listener to the login form
document.querySelector('#signin-form').addEventListener('submit', loginFormHandler);
