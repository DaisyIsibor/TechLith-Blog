// Function to handle form submission for creating a new post
document.addEventListener('DOMContentLoaded', () => {
    // Function to handle form submission for creating a new post
    const newPostFormHandler = async (event) => {
        event.preventDefault();

        const title = document.querySelector('#title').value.trim();
        const content = document.querySelector('#content').value.trim();

        if (title && content) {
            try {
                const response = await fetch('/api/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title, content })
                });

                if (response.ok) {
                    const responseData = await response.json();
                    const postId = responseData.id;

                    // Redirect to the homepage with the post ID as a URL parameter
                    window.location.href = `/?postId=${postId}`;
                } else {
                    const responseData = await response.json();
                    alert(`Error: ${responseData.error}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while processing your request.');
            }
        }
    };

    document.querySelector('#newpost-form').addEventListener('submit', newPostFormHandler);

    // document.querySelector('#edit-post-form').addEventListener('submit', editPostFormHandler);
});


