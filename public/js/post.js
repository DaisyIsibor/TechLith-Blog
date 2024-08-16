// // Function to handle form submission for creating a new post

// document.addEventListener('DOMContentLoaded', () => {
//     // Function to handle form submission for creating a new post
//     const newPostFormHandler = async (event) => {
//         event.preventDefault();

//         const title = document.querySelector('#title').value.trim();
//         const content = document.querySelector('#content').value.trim();

//         if (title && content) {
//             try {
//                 const response = await fetch('/api/posts', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ title, content })
//                 });

//                 if (response.ok) {
//                     const responseData = await response.json();
//                     const postId = responseData.id;

//                     // Redirect to the homepage with the post ID as a URL parameter
//                     window.location.href = `/?postId=${postId}`;
//                 } else {
//                     const responseData = await response.json();
//                     alert(`Error: ${responseData.error}`);
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//                 alert('An error occurred while processing your request.');
//             }
//         }
//     };

//     document.querySelector('#newpost-form').addEventListener('submit', newPostFormHandler);

//     // document.querySelector('#edit-post-form').addEventListener('submit', editPostFormHandler);
// });


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
                    // window.location.href = `/?postId=${postId}`;

                    window.location.href = `/post/${postId}/comments`;
                    
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

    // Adding the event listener for new post form submission
    const newPostForm = document.querySelector('#newpost-form');
    if (newPostForm) {
        newPostForm.addEventListener('submit', newPostFormHandler);
    }

    // Function to handle form submission for adding a new comment

    const commentFormHandler = async (event) => {
        event.preventDefault();

        const commentText = document.querySelector('#comment-text').value.trim();
        const postId = document.querySelector('#post-id').value;

        console.log('Comment Text:', commentText); // Added log
        console.log('Post ID:', postId); // Added log

        if (commentText && postId) {
            try {
                const response = await fetch('/api/comments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ comment_text: commentText, postId })
                });


                console.log('Response:', response); // Added log


                if (response.ok) {
                    document.location.reload(); // Reload the page to display the new comment
                } else {
                    console.error('Failed to submit the comment:', response.statusText);
                    alert('Failed to submit the comment. Please try again later.');
                }
            } catch (error) {
                console.error('Error submitting the comment:', error.message);
                alert('An error occurred while processing your request.');
            }
        } else {
            alert('Please enter your comment before submitting.');
        }
    };

    // Adding the event listener for comment form submission
    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', commentFormHandler);
    } else {
        console.error('Comment form not found.');
    }

});

