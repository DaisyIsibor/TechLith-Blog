document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Get input values
        const email = signupForm.elements['signup-email'].value.trim();
        const username = signupForm.elements['signup-username'].value.trim();
        const password = signupForm.elements['signup-password'].value.trim();
        
        // Perform sign up validation if needed
        // For example, check if email, username, and password are not empty
        
        // Check if email, username, and password are provided
        if (email && username && password) {
            try {
                // Send a POST request to the sign-up endpoint
                const response = await fetch('/api/users/signup', {
                    method: 'POST',
                    body: JSON.stringify({ email, username, password }),
                    headers: { 'Content-Type': 'application/json' },
                });

                // Check if the response is successful
                if (response.ok) {
                    // Redirect to the profile page after successful sign-up
                    window.location.href = '/profile';
                } else {
                    // Display an error message if sign-up fails
                    alert('Sign up failed. Please try again.');
                }
            } catch (err) {
                console.error('Error:', err); // Log any errors for debugging
                alert('An error occurred while signing up. Please try again later.');
            }
        } else {
            // Display an error message if any of the fields are empty
            alert('Please fill in all fields.');
        }
    });
});
