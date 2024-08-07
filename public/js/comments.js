// document.addEventListener('DOMContentLoaded', function() {
//     const commentForm = document.getElementById('comment-form');
//     if (commentForm) {
//         commentForm.addEventListener('submit', async (event) => {
//             event.preventDefault(); // Prevent the default form submission behavior

//             const commentText = document.getElementById('comment-text').value.trim();
//             const postId = document.getElementById('post-id').value; // Retrieve postId from hidden input field

//             console.log('Comment Text:', commentText); // Added log
//             console.log('Post ID:', postId); // Added log

//             if (commentText && postId) {
//                 try {
//                     const response = await fetch('/api/comments', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json'
//                         },
//                         body: JSON.stringify({
//                             comment_text: commentText,
//                             postId: postId
//                         })
//                     });


//                     console.log('Response:', response); // Added log
                    

//                     if (response.ok) {
//                         document.location.reload(); // Reload the page to display the new comment
//                     } else {
//                         console.error('Failed to submit the comment:', response.statusText);
//                         alert('Failed to submit the comment. Please try again later.');
//                     }
//                 } catch (error) {
//                     console.error('Error submitting the comment:', error.message);
//                     alert('An error occurred while processing your request.');
//                 }
//             } else {
//                 alert('Please enter your comment before submitting.');
//             }
//         });
//     } else {
//         console.error('Comment form not found.');
//     }
// });
