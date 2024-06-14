const newFormHandler = async (event) => {
    event.preventDefault();

    const Name = document.querySelector()
} 


const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')){
        const id = event.target.getAttribute('data-id');
        const reponse = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (reponse.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to Delete post')
        }
    }
};

document
    .querySelector('post-list')
    .addEventListener('click', delButtonHandler);